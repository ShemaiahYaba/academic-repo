export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          first_name: string
          last_name: string
          middlename: string
          mobile_number: string
          bio: string
          school: string
          degree: string
          field_of_study: string
          research_field: string
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'user' | 'editor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'editor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'editor'
          created_at?: string
          updated_at?: string
        }
      }
      academic_papers: {
        Row: {
          id: string
          title: string
          abstract: string | null
          authors: string[]
          keywords: string[]
          file_url: string | null
          doi: string | null
          published_date: string | null
          journal: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          abstract?: string | null
          authors: string[]
          keywords: string[]
          file_url?: string | null
          doi?: string | null
          published_date?: string | null
          journal?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          abstract?: string | null
          authors?: string[]
          keywords?: string[]
          file_url?: string | null
          doi?: string | null
          published_date?: string | null
          journal?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 