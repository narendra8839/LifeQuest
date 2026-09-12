/**
 * database.ts — Supabase generated types placeholder.
 *
 * Replace this file with the output of:
 *   npx supabase gen types typescript --project-id <your-project-id> > types/database.ts
 *
 * The Database generic type is used to give full type-safety to all
 * Supabase client queries throughout the app.
 */

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
          id:         string
          username:   string | null
          avatar:     string | null
          level:      number
          xp:         number
          gold:       number
          streak:     number
          created_at: string
          updated_at: string
        }
        Insert: {
          id:         string
          username?:  string | null
          avatar?:    string | null
          level?:     number
          xp?:        number
          gold?:      number
          streak?:    number
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?:  string | null
          avatar?:    string | null
          level?:     number
          xp?:        number
          gold?:      number
          streak?:    number
          updated_at?: string
        }
      }
      attributes: {
        Row: {
          id:          string
          user_id:     string
          intellect:   number
          strength:    number
          discipline:  number
          vitality:    number
          creativity:  number
        }
        Insert: {
          id?:         string
          user_id:     string
          intellect?:  number
          strength?:   number
          discipline?: number
          vitality?:   number
          creativity?: number
        }
        Update: {
          intellect?:  number
          strength?:   number
          discipline?: number
          vitality?:   number
          creativity?: number
        }
      }
      quests: {
        Row: {
          id:           string
          user_id:      string
          title:        string
          description:  string | null
          category:     string
          difficulty:   string
          xp_reward:    number
          gold_reward:  number
          completed:    boolean
          created_at:   string
          completed_at: string | null
        }
        Insert: {
          id?:          string
          user_id:      string
          title:        string
          description?: string | null
          category?:    string
          difficulty?:  string
          xp_reward?:   number
          gold_reward?: number
          completed?:   boolean
          created_at?:  string
          completed_at?: string | null
        }
        Update: {
          title?:        string
          description?:  string | null
          category?:     string
          difficulty?:   string
          xp_reward?:    number
          gold_reward?:  number
          completed?:    boolean
          completed_at?: string | null
        }
      }
      achievements: {
        Row: {
          id:          string
          name:        string
          description: string
          requirement: Json
          reward_xp:   number
          reward_gold: number
          icon:        string
        }
        Insert: {
          id?:         string
          name:        string
          description: string
          requirement: Json
          reward_xp?:  number
          reward_gold?: number
          icon?:       string
        }
        Update: {
          name?:        string
          description?: string
          requirement?: Json
          reward_xp?:   number
          reward_gold?: number
          icon?:        string
        }
      }
      user_achievements: {
        Row: {
          id:             string
          user_id:        string
          achievement_id: string
          unlocked_at:    string
        }
        Insert: {
          id?:            string
          user_id:        string
          achievement_id: string
          unlocked_at?:   string
        }
        Update: {
          unlocked_at?: string
        }
      }
    }
    Views:   Record<string, never>
    Functions: Record<string, never>
    Enums:   Record<string, never>
  }
}
