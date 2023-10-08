import { createClient } from '@supabase/supabase-js';

const supabase = createClient(`${process.env.SUPABASE_API_URL}`, `${process.env.SUPABASE_API_KEY}`);

interface LoginType {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginType) => {
  console.log("Logging in")
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })
  console.log("DATA: ", data)
  if (error) throw error;
  return data
}

export const fetchAllStems = async () => {
  console.log("Fetching stems")
  const { data, error } = await supabase
    .storage
    .from('stems')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
    // .download('yohttps://zbjqawwprylisghamuhb.supabase.co/storage/v1/object/public/stems/Spacehog%20-%20In%20The%20Meantime%20(01%20-%20Guitar).mp3?t=2023-10-07T21%3A13%3A40.989Z');
  if (error) throw error;
  console.log("DATA: ", data)

  return data;
};

export const fetchRandomStem = async () => {
  console.log("Fetching random stem")
  const { data, error } = await supabase
    .storage
    .from('stems')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
    // .download('yohttps://zbjqawwprylisghamuhb.supabase.co/storage/v1/object/public/stems/Spacehog%20-%20In%20The%20Meantime%20(01%20-%20Guitar).mp3?t=2023-10-07T21%3A13%3A40.989Z');
  if (error) throw error;
  console.log("DATA: ", data)

  return data;
};