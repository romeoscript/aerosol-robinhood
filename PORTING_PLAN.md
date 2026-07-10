# Porting Plan → Robinhood Chain

> **Status (2026-07-10):** Phase 1 (frontend) & Phase 2 (backend) implemented on
> branch `feat/robinhood-chain` in both repos. Both typecheck clean. Remaining:
> Phase 3 (Privy dashboard → Ethereum embedded wallets) and Phase 4 (testnet
> e2e run) require account access / a live environment.

## Locked decisions (from product)

- **Unit of value:** native **ETH** (no ERC-20 contracts).
- **Custody:** transfers stay **fully client-side** (Privy embedded wallet). ⇒
  the backend Solana signing code (`onChainAction.ts`, `/api/withdraw`) is
  **deleted**, not rewritten.
- **First cut on testnet** (chain 46630), then flip config to mainnet 4663.
- **Greenfield** — no existing users, **no wallet/balance migration**.

## Target networks (verified)

| Param | Testnet (first) | Mainnet (later) |
|-------|-----------------|-----------------|
| Chain ID | **46630** | **4663** |
| RPC | `https://rpc.testnet.chain.robinhood.com/rpc` | `https://rpc.mainnet.chain.robinhood.com` |
| Explorer | `https://explorer.testnet.chain.robinhood.com` | `https://robinhoodchain.blockscout.com` |
| Native token | ETH (18 dec) | ETH (18 dec) |
| Faucet | `https://faucet.testnet.chain.robinhood.com` | — |

Stack: Arbitrum L2 on Ethereum, **fully EVM-compatible**. Because the frontend
is already EVM (BSC), this is a **re-configuration, not a rewrite** — put chain
params behind env vars so testnet→mainnet is a config flip.

Because Robinhood Chain is EVM and the **frontend is already EVM (BSC)**, this is
a **re-configuration, not a rewrite**. The bulk of the work is the backend, which
is still Solana, plus wiring both sides to chain 4663 and swapping BNB→ETH copy.

Testnet exists (via Alchemy/QuickNode/dRPC) — recommended to validate first.

---

## Phase 1 — Frontend (small; already EVM)

Files: `frontend/app/Providers.tsx`, `components/profile/deposit-modal.tsx`,
`components/profile/withdraw-modal.tsx`, `app/approve/[id]/page.tsx`,
`components/profile/wallet-transaction-history.tsx`, `.env`.

1. **Chain config** in `Providers.tsx`: replace `bsc`/`bscTestnet` from
   `wagmi/chains` with a custom `defineChain({ id: 4663, ... })` (wagmi has no
   built-in Robinhood chain). Update `supportedChains` / `defaultChain` in Privy
   config: `nativeCurrency` → `{ name: "Ether", symbol: "ETH", decimals: 18 }`,
   RPC → Robinhood RPC.
2. **Env**: replace `NEXT_PUBLIC_BSC_NETWORK` / `NEXT_PUBLIC_BSC_RPC_URL` with
   `NEXT_PUBLIC_ROBINHOOD_RPC_URL` (+ chain id). Remove stale
   `NEXT_PUBLIC_SOLANA_RPC_URL`, `MONGODB_URI` (unused; app uses Supabase).
3. **Copy / UX**: "BNB" → "ETH" labels in deposit-modal, withdraw-modal,
   approve page; fee-reserve constants (`0.01 BNB`) revisit for L2 gas.
4. **Explorer links**: `https://bscscan.com/tx/${hash}` →
   `https://robinhoodchain.blockscout.com/tx/${hash}` (grep both repos).
5. Verify Privy dashboard supports the custom chain / has the app configured for
   ethereum embedded wallets on chain 4663.

## Phase 2 — Backend (the real work; still Solana)

Files: `backend/src/services/onChainAction.ts`,
`backend/src/api/routes/withdraw/withdraw.ts`, `backend/src/bot/samplebot.ts`,
`backend/src/types/username.ts`, `backend/package.json`, `.env`.

1. **Dependencies**: drop `@solana/web3.js`, `bs58`, `tweetnacl`,
   `@goat-sdk/*` (Solana adapter). Keep/lean on `ethers` (already present) or
   `viem` (already present). Pick one for consistency — `viem` matches frontend.
2. **`samplebot.ts` — recipient wallet creation (active bug):** change Privy
   `importUser({ createSolanaWallet: true })` → EVM embedded wallet
   (`createEthereumWallet: true` per Privy server SDK). Recipients currently get
   Solana addresses that the EVM frontend can't use.
3. **Payment parsing** (`username.ts` + `samplebot.ts` regex/keywords): the
   `\bsol|solana\b` token matching and `paymentPatterns` should accept the new
   unit (ETH). Keep intent detection; swap the symbol. LLM prompt mentions "SOL".
4. **Bot reply copy**: "send X SOL", Solscan link → Robinhood explorer link,
   "claim your SOL" → "claim your ETH".
5. **DELETE Solana signing code** (custody is client-side): remove
   `onChainAction.ts` and its import in `samplebot.ts`; remove the
   `withdraw/withdraw.ts` route and the inline `withdrawHandler` in
   `samplebot.ts` (the client signs via Privy in `app/approve/[id]/page.tsx`).
   If a "withdraw to external address" UX is still wanted, it becomes a
   client-side EVM send too — no backend key.
6. **Env**: remove `SOLANA_PRIVATE_KEY`/`SOLANA_NETWORK`. Add
   `ROBINHOOD_RPC_URL` + `CHAIN_ID` (46630 testnet → 4663 mainnet). No backend
   signing key needed.

## Phase 3 — Shared data / infra

- **Supabase**: schema (`users.balance`, `transactions`) is chain-agnostic — no
  migration. `transactions.signature` now holds an EVM tx hash;
  `recipient_address`/`sender_address` now `0x…`. Greenfield ⇒ safe to wipe test
  rows so no Solana addresses linger.
- **Privy**: configure the project for **Ethereum embedded wallets** on the
  Robinhood chain. No existing-user migration (greenfield).
- **Redis**: unaffected (only stores last tweet id).

## Phase 4 — Verify

- Testnet dry run: deposit → tweet intent → approval link → client-side send →
  confirmation tweet, all on chain 4663.
- Grep both repos for residual `sol`, `solana`, `lamports`, `bsc`, `bnb`,
  `bscscan`, `solscan` before cutover.
- Check bot Privy import creates an EVM (0x) recipient address end-to-end.

---

## Effort estimate

| Area | Size | Notes |
|------|------|-------|
| Frontend | S | `defineChain(46630)`, ETH copy, Blockscout URLs, env |
| Backend bot/parse/copy | M | ETH symbol + Privy EVM wallet + reply text |
| Backend Solana deletion | S | Remove onChainAction + withdraw route (client-side) |
| Privy config | S | Ethereum embedded wallets; no user migration |

## Recommended execution order

1. Privy dashboard: enable Ethereum embedded wallets; add Robinhood testnet.
2. Frontend chain config → testnet 46630 (env-driven), ETH copy, explorer URLs.
3. Backend: fix `createSolanaWallet`→EVM, ETH parsing/copy, delete Solana code.
4. End-to-end testnet run with faucet ETH (deposit → tweet → approve → confirm).
5. Grep both repos for `sol|solana|lamports|bsc|bnb|bscscan|solscan` residue.
6. Flip env from testnet 46630 → mainnet 4663; smoke test.
