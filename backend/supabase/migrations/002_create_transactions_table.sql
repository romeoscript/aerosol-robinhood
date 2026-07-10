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

-- Create policy to allow all operations (you can customize this based on your needs)
CREATE POLICY "Allow all operations on transactions" ON public.transactions
    FOR ALL USING (true);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_transactions_updated_at 
    BEFORE UPDATE ON public.transactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 