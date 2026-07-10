import { defineChain } from "viem";

// Single source of truth for chain config. Flip testnet <-> mainnet with
// NEXT_PUBLIC_ROBINHOOD_NETWORK ("mainnet" for prod; anything else = testnet).
const isTestnet = process.env.NEXT_PUBLIC_ROBINHOOD_NETWORK !== "mainnet";

const NETWORKS = {
  testnet: {
    id: 46630,
    name: "Robinhood Chain Testnet",
    rpc: "https://rpc.testnet.chain.robinhood.com/rpc",
    explorer: "https://explorer.testnet.chain.robinhood.com",
  },
  mainnet: {
    id: 4663,
    name: "Robinhood Chain",
    rpc: "https://rpc.mainnet.chain.robinhood.com",
    explorer: "https://robinhoodchain.blockscout.com",
  },
} as const;

// Widen `id` to `number` so downstream types (wagmi transports keyed by chain
// id) don't see a `46630 | 4663` union and demand a key for both networks.
const active: { id: number; name: string; rpc: string; explorer: string } =
  isTestnet ? NETWORKS.testnet : NETWORKS.mainnet;

export const RPC_URL = process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL || active.rpc;
export const EXPLORER_URL = active.explorer;
export const CHAIN_ID = active.id;
export const NATIVE_SYMBOL = "ETH";

export const robinhoodChain = defineChain({
  id: active.id,
  name: active.name,
  nativeCurrency: { name: "Ether", symbol: NATIVE_SYMBOL, decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL] } },
  blockExplorers: {
    default: { name: "Blockscout", url: EXPLORER_URL },
  },
  testnet: isTestnet,
});

export const txExplorerUrl = (hash: string) => `${EXPLORER_URL}/tx/${hash}`;
