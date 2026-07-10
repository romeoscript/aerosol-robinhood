import { supabase } from '@/lib/supabase'

export async function supabaseConnect() {
  try {
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

export default supabaseConnect 