import type { AuthError, Session, User } from "@supabase/supabase-js"

export interface AuthCredentials {
  email:    string
  password: string
}

export interface AuthResult {
  data: {
    user:    User    | null
    session: Session | null
  }
  error: AuthError | null
}

export interface AuthState {
  user:      User | null
  session:   Session | null
  isLoading: boolean
}
