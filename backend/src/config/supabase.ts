import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types for TypeScript
export interface User {
  id: string
  username: string
  balance: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  tweet_id: string
  sender: string
  recipient: string
  recipient_address: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  signature?: string
  sender_address?: string
  created_at: string
  updated_at: string
  expires_at: string
  completed_at?: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      transactions: {
        Row: Transaction
        Insert: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Transaction, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}

export async function connectToSupabase() {
  try {
    console.log('Attempting to connect to Supabase...')
    
    // Test the connection by making a simple query
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      throw error
    }
    
    console.log('Successfully connected to Supabase!')
    return { supabase }
  } catch (error) {
    console.error('Failed to connect to Supabase:', error)
    throw error
  }
} 