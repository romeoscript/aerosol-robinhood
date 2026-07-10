# Backend Supabase Setup Guide

## 1. Environment Variables

Add these environment variables to your `.env` file:

```
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Remove or comment out MongoDB configuration
# MONGODB_URI=your_mongodb_uri
```

## 2. Database Tables

Run these SQL migrations in your Supabase SQL Editor:

### Users Table (if not already created)
```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    balance DECIMAL(20, 8) DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on users" ON public.users
    FOR ALL USING (true);
```

### Transactions Table
```sql
-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY,
    tweet_id TEXT NOT NULL,
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    recipient_address TEXT NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    signature TEXT,
    sender_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_id ON public.transactions(id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_expires_at ON public.transactions(expires_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on transactions" ON public.transactions
    FOR ALL USING (true);
```

### Update Trigger Function
```sql
-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON public.transactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## 3. API Endpoints

Your backend now has these Supabase-powered endpoints:

### User Balance
- `GET /api/userBalance?username=test` - Get user balance
- `POST /api/userBalance` - Update user balance

### Transactions
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions/complete` - Complete a transaction

### Health Check
- `GET /health` - Check service health (Supabase + Redis)

## 4. Benefits

✅ **No IP whitelist issues**  
✅ **Better performance** with PostgreSQL  
✅ **Built-in Row Level Security**  
✅ **Automatic backups** included  
✅ **Real-time capabilities**  
✅ **Better TypeScript support**  

## 5. Testing

1. Start your backend: `npm run dev`
2. Test the health endpoint: `GET http://localhost:3005/health`
3. Test user balance: `GET http://localhost:3005/api/userBalance?username=test`

## 6. Migration Notes

- All MongoDB `db.collection()` calls replaced with Supabase queries
- MongoDB `findOne()` → Supabase `.single()`
- MongoDB `updateOne()` → Supabase `.update().eq()`
- MongoDB `insertOne()` → Supabase `.insert()`
- Error handling updated for Supabase error codes 