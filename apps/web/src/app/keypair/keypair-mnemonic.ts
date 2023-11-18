import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { HDKey } from 'ed25519-keygen/hdkey';

export function fromMnemonic(
  mnemonic: string,
  path = `m/44'/501'/0'/0'`
): SolanaKeypair {
  const seed = bip39.mnemonicToSeedSync(mnemonic, '');
  const hd = HDKey.fromMasterSeed(Buffer.from(seed).toString('hex'));
  return SolanaKeypair.fromSeed(hd.derive(path).privateKey);
}

export function isMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic, wordlist);
}

export function generateMnemonic(strength = 128) {
  return bip39.generateMnemonic(wordlist, strength);
}
