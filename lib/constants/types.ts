export interface AltTokenReturnType {
  name: string;
  symbol: string;
  balance: string;
  contractAddress: string;
  icon: string;
}

export interface Mnemonic {
  phrase: string;
  password: string;
  wordlist: any;
  entropy: string;
}

export interface WalletAPIReturnProp {
  provider: any;
  address: string;
  publicKey: string;
  fingerprint: string;
  parentFingerprint: string;
  mnemonic: Mnemonic;
  chainCode: string;
  path: string;
  index: number;
  depth: number;
}

export type TransactionReceipt = {
  blockHash: string;
  blockNumber: number;
  cumulativeGasUsed: number;
  effectiveGasPrice: number;
  from: string;
  gasUsed: number;
  logs: any;
  logsBloom: string;
  status: number;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: number;
};

export type ImportCustomTokenProp = {
  name: string;
  symbol: string;
  decimals: number;
  balance: number;
};

// Create a generic type for secret phrases
export type SecretPhraseType = {
  [key: string]: string;
};
