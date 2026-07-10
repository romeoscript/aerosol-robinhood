# Environment Setup Guide

## 1. Create .env file

Create a `.env` file in the root directory with the following variables:

```bash
# Robinhood Chain Configuration
# "mainnet" = chain 4663; anything else (or unset) = testnet 46630
ROBINHOOD_NETWORK=testnet
ROBINHOOD_RPC_URL=https://rpc.testnet.chain.robinhood.com/rpc

# Redis Configuration (choose one option)
# Option 1: Local Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=

# Option 2: Upstash Redis (replace with your actual credentials)
# REDIS_HOST=your-redis-host.upstash.io
# REDIS_PORT=6379
# REDIS_USERNAME=default
# REDIS_PASSWORD=your_redis_password

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Privy Authentication
PRIVY_CLIENT_ID=your_privy_client_id
PRIVY_CLIENT_SECRET=your_privy_client_secret

# Twitter Bot Credentials
MY_USERNAME=your_twitter_bot_username
PASSWORD=your_twitter_password
EMAIL=your_twitter_email

# AI Configuration
GROQ_API_KEY=your_groq_api_key
```

## 2. Redis Setup Options

### Option A: Local Redis (Recommended for development)
```bash
# Install Redis on macOS
brew install redis

# Start Redis service
brew services start redis

# Test Redis connection
redis-cli ping
```

### Option B: Upstash Redis (Cloud)
1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the connection details to your `.env` file

## 3. Supabase Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open the SQL Editor
3. Run the migration files in order:
   - `supabase/migrations/001_create_users_table.sql`
   - `supabase/migrations/002_create_transactions_table.sql`

## 4. Test the Setup

After setting up the environment variables:

```bash
# Test Redis connection
redis-cli ping

# Test Supabase connection by running your app
npm run dev
```

The health endpoint should return:
```json
{
  "status": "ok",
  "services": {
    "supabase": "connected",
    "redis": "connected"
  }
}
```
