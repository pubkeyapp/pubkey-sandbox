import { PublicKey } from '@solana/web3.js';

export type PublicKeyString = PublicKey | string;

export function getPublicKey(publicKey: PublicKeyString): PublicKey {
  return typeof publicKey === 'string' ? new PublicKey(publicKey) : publicKey;
}
