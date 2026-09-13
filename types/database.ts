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
          id?:        string
          username?:  string | null
          avatar?:    string | null
          level?:     number
          xp?:        number
          gold?:      number
          streak?:    number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
          id?:         string
          user_id?:    string
          intellect?:  number
          strength?:   number
          discipline?: number
          vitality?:   number
          creativity?: number
        }
        Relationships: [
          {
            foreignKeyName: "attributes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
          id?:          string
          user_id?:     string
          title?:        string
          description?:  string | null
          category?:     string
          difficulty?:   string
          xp_reward?:    number
          gold_reward?:  number
          completed?:    boolean
          created_at?:   string
          completed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
          requirement?: Json
          reward_xp?:  number
          reward_gold?: number
          icon?:       string
        }
        Update: {
          id?:         string
          name?:        string
          description?: string
          requirement?: Json
          reward_xp?:   number
          reward_gold?: number
          icon?:        string
        }
        Relationships: []
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
          id?:            string
          user_id?:       string
          achievement_id?: string
          unlocked_at?:   string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
