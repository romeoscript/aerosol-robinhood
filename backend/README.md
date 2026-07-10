# AeroSol Backend

## Overview

AeroSol is a Twitter-powered payment solution that allows users to send ETH to any Twitter user through simple tweets, running on **Robinhood Chain** (an Ethereum L2). The backend consists of a Twitter bot that monitors mentions, parses payment requests, provisions recipient wallets, and records payment intents. The actual on-chain transfer is executed client-side by the sender's Privy embedded wallet.

![AeroSol Logo](https://i.imgur.com/placeholder-for-logo.png)

## Features

- **Twitter-Based Payments**: Send ETH to any Twitter user by mentioning `@AeroSol_Finance`
- **Automatic Wallet Creation**: Recipients don't need a pre-existing wallet (Privy EVM embedded wallet)
- **Natural Language Processing**: AI-powered extraction of payment details from tweets
- **Transaction Verification**: Automatic reply with a Blockscout explorer link
- **Balance Management**: Integration with user balance database

## Architecture

The AeroSol backend consists of several key components:

1. **Twitter Bot**: Monitors mentions and processes payment requests
2. **Robinhood Chain Integration**: EVM (Ethereum L2); transfers signed client-side via Privy
3. **AI Processing**: Uses Groq LLM to extract payment details from tweets
4. **State Management**: Uses Redis to track processed tweets
5. **User Management**: Integrates with Privy for user authentication and wallet management

## Prerequisites

- Node.js (v16+)
- Redis instance
- Privy account
- Twitter developer account
- Groq API key
- Privy account configured for Ethereum embedded wallets

## Environment Variables

Create a `.env` file with the following variables:

```
# Robinhood Chain Configuration
# "mainnet" = chain 4663; anything else (or unset) = testnet 46630
ROBINHOOD_NETWORK=testnet
ROBINHOOD_RPC_URL=https://rpc.testnet.chain.robinhood.com/rpc

# Redis Configuration
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=your_redis_username
REDIS_PASSWORD=your_redis_password

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

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/SendX_backend.git
cd SendX_backend

# Install dependencies
npm install

# Start the bot
npm start
```

## Usage Flow

1. **User Registration**: Users register on the AeroSol platform (https://sendx-pi.vercel.app)
2. **Deposit Funds**: Users deposit ETH into their AeroSol account
3. **Send Payment**: Users tweet `@AeroSol_Finance send [amount] ETH to @recipient`
4. **Processing**: The bot records the intent and the sender approves the transfer in-app
5. **Confirmation**: The bot replies with a transaction link

## API Integration

The backend integrates with the AeroSol frontend API:

- `GET /api/userBalance?username={username}`: Retrieve user balance
- `POST /api/userBalance`: Update user balance

## Deployment

This backend is designed to be deployed on platforms like Railway or Heroku as a worker process (not a web server).

### Railway Deployment

1. Create a new Railway project
2. Connect your GitHub repository
3. Add all environment variables
4. Deploy with the command `node samplebot.js`

### Heroku Deployment

1. Create a new Heroku app
2. Connect your GitHub repository
3. Add a Procfile with `worker: node samplebot.js`
4. Configure all environment variables
5. Deploy and ensure the worker dyno is running (not web)

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript files
npm run build
```

## File Structure

- `samplebot.js`: Main Twitter bot implementation
- `src/config/chain.ts`: Robinhood Chain network config (testnet/mainnet)
- `src/types/username.ts`: Tweet parsing and username extraction
- `.env`: Environment configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Robinhood Chain](https://docs.robinhood.com/chain/) - Ethereum L2 blockchain platform
- [Privy](https://privy.io/) - Authentication and wallet management
- [agent-twitter-client](https://www.npmjs.com/package/agent-twitter-client) - Twitter API client
- [Groq](https://groq.com/) - LLM provider 