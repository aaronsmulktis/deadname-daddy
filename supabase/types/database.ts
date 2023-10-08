export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      stems: {
        Row: {  // the data expected from .select()
          id: number
          created_at: Date
          title: string
          valence: number
          speechiness: number
          bpm: number
          length: number
          genre: string
          artist: string
          groove: string
          key: string
          time_signature: string
          instrument: string
          updated_at: Date
          year: Date
        }
        Insert: {  // the data to be passed to .insert()
          id?: never  // generated columns must not be supplied
          title: string  // `not null` columns with no default must be supplied
          valence?: number | null  // nullable columns can be omitted
          speechiness?: number | null
          bpm?: number | null
          length?: number | null
          genre?: string | null
          artist?: string | null
          groove?: string | null
          key?: string | null
          time_signature?: string | null
          instrument?: string | null
          updated_at?: Date | null
          year?: Date | null
        }
        Update: {  // the data to be passed to .update()
          id?: never
          title?: string  // `not null` columns are optional on .update()
          valence?: number | null
          speechiness?: number | null
          bpm?: number | null
          length?: number | null
          genre?: string | null
          artist?: string | null
          groove?: string | null
          key?: string | null
          time_signature?: string | null
          instrument?: string | null
          updated_at?: Date | null
          year?: Date | null
        }
      }
    }
  }
}
