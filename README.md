# AeroSol / EasyPay — Workspace

Twitter-powered crypto payments: send funds to any Twitter/X user with a tweet
(`@AeroSol_Finance send 0.1 to @recipient`). Recipients don't need a pre-existing
wallet — one is auto-created for them via Privy.

## Repositories

| Dir         | Repo                                             | Role |
|-------------|--------------------------------------------------|------|
| `frontend/` | `github.com/romeoscript/aerosol`                 | Next.js 14 web app (landing, profile, deposit/withdraw, tx approval) |
| `backend/`  | `github.com/romeoscript/aerosol_backend`         | Express server + Twitter bot worker |

## Architecture

```
                      ┌────────────────────────────┐
   tweet mention ───► │  Twitter Bot (backend)     │
                      │  - poll mentions (scraper) │
                      │  - parse "send X to @user" │  Groq LLM + regex
                      │  - ensure recipient wallet │  Privy (importUser)
                      │  - write tx intent row     │  Supabase
                      │  - reply w/ approval link  │
                      └────────────┬───────────────┘
                                   │  /approve/:id
                                   ▼
                      ┌────────────────────────────┐
   user signs in ───► │  Web App (frontend)        │
   with Twitter       │  - Privy embedded wallet   │
                      │  - sends tx on-chain  ◄─────┼── actual value transfer
                      │  - POST /transactions/     │   happens CLIENT-SIDE
                      │    complete                │
                      └────────────┬───────────────┘
                                   ▼
                      ┌────────────────────────────┐
                      │  Backend confirms + tweets │
                      │  Solscan/explorer link     │
                      └────────────────────────────┘
```

Shared state: **Supabase** (`users` = off-chain balance ledger, `transactions`
= payment intents). **Redis** tracks the last-processed tweet id.

## ⚠️ Current chain state (important)

The two repos are **out of sync** on chain:

- **Frontend: already migrated to EVM (BSC / BNB).** Uses `wagmi` + `viem` +
  `ethers`, Privy `walletChainType: "ethereum-only"`, deposit/approve send native
  BNB, explorer links point to BscScan. See commit `0ec9ea1 "Switch from
  Solana/SOL to BSC/BNB"`.
- **Backend: still on Solana.** `@solana/web3.js`, `onChainAction.ts` and the
  `/api/withdraw` handler build Solana transfers, the bot parses "SOL", replies
  with Solscan links, and imports recipients with `createSolanaWallet: true`.

Because the real value transfer is **client-side** (Privy embedded EVM wallet in
`frontend/app/approve/[id]/page.tsx` and `deposit-modal.tsx`), the app can appear
to "work" while the backend's Solana code paths (`onChainAction`, `/api/withdraw`)
are effectively legacy/unused. The bot's `createSolanaWallet: true` is an active
bug for the EVM flow — see the plan.

See [PORTING_PLAN.md](./PORTING_PLAN.md) for the migration to **Robinhood Chain**.
```
```
