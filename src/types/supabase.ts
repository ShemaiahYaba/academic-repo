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
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'user' | 'moderator'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'moderator'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'user' | 'moderator'
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