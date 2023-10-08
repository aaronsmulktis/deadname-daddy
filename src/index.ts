import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { login, fetchAllStems } from './utils/supabase';

dotenv.config({ path: '.env.development' });

const app = express();
const supabase = createClient(
  process.env.SUPABASE_API_URL as string,
  process.env.SUPABASE_API_KEY as string
);

app.use(bodyParser.json());

app.post('/login', [
  check('email').isEmail(),
  check('password').isLength({ min: 5 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    })

    if (error) return res.status(401).json({ error: error.message });
    res.status(200).json({ token: data?.user });
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/all-stems', async (req, res) => {
  try {
    const data = await fetchAllStems();
    res.status(200).send(data);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/mix', async (req, res) => {
  // Your existing logic remains untouched
  res.status(501).send('Not Implemented');
});

app.post('/upload', async (req, res) => {
  try {
    const uploadResponse = await supabase
      .storage
      .from('stems')
      .upload('file-key', req);  // Adjust this as per your file handling logic

    if (uploadResponse.error) {
      res.status(500).send(uploadResponse.error.message);
      return;
    }

    const { data, error } = await supabase
      .from('stems')
      .insert({
        title: 'File Title',
        // ...other fields
      });

    if (error) {
      res.status(500).send(error.message);
      return;
    }

    res.status(200).send(data);
  } catch (exception) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
