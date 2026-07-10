# EasyPay (AeroSol)

EasyPay is a web3 application that lets users send crypto payments to any Twitter/X
user by tweet. It runs on **Robinhood Chain** (an Ethereum L2) with **ETH** as the
unit of value. Users sign in with Twitter via Privy, get an embedded EVM wallet,
and approve transfers client-side.

## Features

- Twitter sign-in + embedded wallet via Privy
- Real-time ETH balance tracking on Robinhood Chain
- Deposit from any external EVM wallet into your embedded wallet
- Tweet-triggered payments (`@AeroSol_Finance send 0.1 ETH to @recipient`)
  approved at `/approve/[id]`
- Withdrawals to any EVM address, signed client-side
- Transaction history via the Blockscout explorer API

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Chain**: Robinhood Chain — testnet 46630 / mainnet 4663 (config in `lib/chain.ts`)
- **Wallets/Auth**: Privy (Twitter login, ethereum-only embedded wallets), wagmi + viem + ethers
- **Database**: Supabase (off-chain balance ledger + payment intents)
- **UI**: Tailwind CSS, shadcn/ui

## Project Structure

```
├── app/
│   ├── api/userBalance/   # Balance ledger endpoints (Supabase)
│   ├── approve/[id]/      # Tweet-payment approval page (signs the transfer)
│   ├── profile/           # User dashboard
│   └── Providers.tsx      # Privy + wagmi providers (Robinhood Chain)
├── components/profile/    # Deposit / withdraw / balance / history
├── lib/chain.ts           # Chain config: ids, RPCs, explorer URLs
└── supabase/migrations/   # DB schema
```

## Getting Started

```bash
npm install
cp .env.sample .env   # then fill in values
npm run dev
```

## Environment Variables

See `.env.sample`. Key ones:

```
NEXT_PUBLIC_PRIVY_APP_ID=...
NEXT_PUBLIC_ROBINHOOD_NETWORK=testnet   # "mainnet" = chain 4663
NEXT_PUBLIC_BACKEND_URL=...             # Twitter-bot backend
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

`.env` is gitignored — never commit real secrets.
