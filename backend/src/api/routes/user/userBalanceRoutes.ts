import { Request, Response } from 'express';
import { supabase } from '@/config/supabase';

// GET endpoint to fetch a user's balance
export async function getUserBalance(req: Request, res: Response) {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ 
        message: 'Missing username',
        error: 'Username parameter is required'
      });
    }
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // User not found
        return res.status(404).json({ 
          message: 'User not found',
          data: null
        });
      }
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message
      });
    }
    
    return res.status(200).json({
      message: 'User balance found',
      data: {
        balance: user.balance || 0
      }
    });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}

// POST endpoint to update a user's balance
export async function updateUserBalance(req: Request, res: Response) {
  try {
    const { username, balance } = req.body;
    
    if (!username || balance === undefined) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        error: 'Username and balance are required'
      });
    }
    
    // Upsert user with balance using Supabase
    const { data: user, error } = await supabase
      .from('users')
      .upsert(
        { username, balance },
        { onConflict: 'username' }
      )
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message
      });
    }
    
    return res.status(200).json({
      message: 'User balance updated successfully',
      data: { username, balance: user.balance }
    });
  } catch (error) {
    console.error('Error updating user balance:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}