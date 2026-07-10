// Single source of truth for chain config (backend).
// Flip testnet <-> mainnet with ROBINHOOD_NETWORK ("mainnet" = chain 4663).
const isTestnet = process.env.ROBINHOOD_NETWORK !== 'mainnet';

const NETWORKS = {
  testnet: {
    id: 46630,
    name: 'Robinhood Chain Testnet',
    rpc: 'https://rpc.testnet.chain.robinhood.com/rpc',
    explorer: 'https://explorer.testnet.chain.robinhood.com',
  },
  mainnet: {
    id: 4663,
    name: 'Robinhood Chain',
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://robinhoodchain.blockscout.com',
  },
} as const;

const active = isTestnet ? NETWORKS.testnet : NETWORKS.mainnet;

export const CHAIN_ID = active.id;
export const CHAIN_NAME = active.name;
export const RPC_URL = process.env.ROBINHOOD_RPC_URL || active.rpc;
export const EXPLORER_URL = active.explorer;
export const NATIVE_SYMBOL = 'ETH';

export const txExplorerUrl = (hash: string) => `${EXPLORER_URL}/tx/${hash}`;
