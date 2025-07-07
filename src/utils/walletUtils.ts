// Add this at the top to extend the Window interface
declare global {
  interface Window {
    cardano?: any;
  }
}

// Types for CIP-30 Wallet API
export interface CardanoWalletApi {
  getNetworkId: () => Promise<number>;
  getUsedAddresses: (paginate?: Paginate) => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  getBalance: () => Promise<string>; // hex-encoded lovelace
  getAssets: () => Promise<string[]>; // asset hex strings
  getUtxos: (amount?: string, paginate?: Paginate) => Promise<Utxo[]>;
  signTx: (tx: string, partialSign?: boolean) => Promise<string>;
  signData: (addr: string, payload: string) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
  getCollateral: () => Promise<Utxo[]>;
  getExtensions?: () => Promise<string[]>;
}

export interface Paginate {
  page: number;
  limit: number;
}

export interface Utxo {
  txHash: string;
  outputIndex: number;
  amount: Array<{ unit: string; quantity: string }>;
  address: string;
  assets?: Array<{ unit: string; quantity: string }>;
}

export interface CardanoWallet {
  name: string;
  icon: string;
  api: () => Promise<CardanoWalletApi>;
  enable: () => Promise<CardanoWalletApi>;
  isEnabled: () => Promise<boolean>;
}

// Helper to detect available wallets
export function getAvailableWallets(): CardanoWallet[] {
  if (typeof window === 'undefined' || !window.cardano) return [];
  const wallets: CardanoWallet[] = [];
  for (const key of Object.keys(window.cardano)) {
    if (window.cardano[key] && window.cardano[key].enable) {
      wallets.push({
        name: window.cardano[key].name || key,
        icon: window.cardano[key].icon || '',
        api: window.cardano[key].api,
        enable: window.cardano[key].enable,
        isEnabled: window.cardano[key].isEnabled,
      });
    }
  }
  return wallets;
}

// Helper to get wallet data
export async function getWalletData(walletApi: CardanoWalletApi) {
  const [addresses, balanceHex, assets] = await Promise.all([
    walletApi.getUsedAddresses(),
    walletApi.getBalance(),
    walletApi.getAssets ? walletApi.getAssets() : Promise.resolve([]),
  ]);
  // Convert balance from hex to ADA
  const balance = parseInt(balanceHex, 16) / 1_000_000;
  // NFTs: filter assets with length > 56 (policyId+assetName)
  const nfts = assets.filter((a: string) => a.length > 56);
  return {
    addresses,
    balance,
    assets,
    nfts,
  };
} 