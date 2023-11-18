import { base58 as bs58 } from '@scure/base';
import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createContext, ReactNode, useContext } from 'react';
import { notifyError, notifySuccess } from '../ui/ui-notify/ui-notify';
import { fromMnemonic, generateMnemonic, isMnemonic } from './keypair-mnemonic';

export function secretToKeypair(secret: string): SolanaKeypair {
  const clean = secret.trim();
  if (!clean.includes(' ') && !clean.includes(',')) {
    console.log('Imported base58 encoded string.');
    return SolanaKeypair.fromSecretKey(bs58.decode(secret));
  }
  if (isMnemonic(secret)) {
    console.log('Imported mnemonic.');
    return fromMnemonic(secret);
  }
  try {
    console.log('Imported byte array.');
    return SolanaKeypair.fromSecretKey(Uint8Array.from(JSON.parse(secret)));
  } catch (error) {
    throw new Error('Invalid secret key.');
  }
}

export interface Keypair {
  name: string;
  publicKey: string;
  secret?: string;
  type?: string;
  active?: boolean;
}

export const defaultKeypairs: Keypair[] = [
  {
    name: 'DEVn..iRaC',
    publicKey: 'DEVnFDAcoNndTfXWmvHz8dxiz41XNuojMvShogP4iRaC',
    secret:
      'beach pool vessel risk teach mountain brave guilt because planet silk sport',
  },
];

const keypairAtom = atomWithStorage<Keypair>(
  'pubkey-sandbox-keypair',
  defaultKeypairs[0]
);
const keypairsAtom = atomWithStorage<Keypair[]>(
  'pubkey-sandbox-keypairs',
  defaultKeypairs
);

const activeKeypairsAtom = atom<Keypair[]>((get) => {
  const keypairs = get(keypairsAtom);
  const keypair = get(keypairAtom);
  return keypairs.map((item) => ({
    ...item,
    active: item.name === keypair.name,
  }));
});

const activeKeypairAtom = atom<Keypair>((get) => {
  const keypairs = get(activeKeypairsAtom);

  return keypairs.find((item) => item.active) || keypairs[0];
});

export interface KeypairProviderContext {
  keypair: Keypair;
  keypairs: Keypair[];
  deleteKeypair: (keypair: Keypair) => void;
  importKeypair: (url: string) => void;
  generateKeypair: () => void;
  setKeypair: (keypair: Keypair) => void;
}

const Context = createContext<KeypairProviderContext>(
  {} as KeypairProviderContext
);

export function KeypairProvider({ children }: { children: ReactNode }) {
  const keypair = useAtomValue(activeKeypairAtom);
  const keypairs = useAtomValue(activeKeypairsAtom);
  const setKeypair = useSetAtom(keypairAtom);
  const setKeypairs = useSetAtom(keypairsAtom);

  const value: KeypairProviderContext = {
    keypair,
    keypairs: keypairs.sort((a, b) => a.name.localeCompare(b.name)),
    deleteKeypair: (keypair: Keypair) => {
      setKeypairs(keypairs.filter((item) => item.name !== keypair.name));
    },
    setKeypair: (keypair: Keypair) => {
      setKeypair(keypair);
    },
    importKeypair: (secret: string) => {
      const kp = secretToKeypair(secret);
      const keypair: Keypair = {
        name: `${kp.publicKey.toString().slice(0, 4)}...`,
        publicKey: kp.publicKey.toString(),
        secret,
        type: 'imported',
      };
      const exists = keypairs.find(
        (item) => item.publicKey === keypair.publicKey
      );
      if (exists) {
        notifyError({ message: `Key already exists!` });
        return;
      }
      setKeypairs([...keypairs, keypair]);
      notifySuccess({ message: `Key imported!` });
    },
    generateKeypair: () => {
      const mnemonic = generateMnemonic();
      const kp = fromMnemonic(mnemonic);
      const keypair: Keypair = {
        name: `${kp.publicKey.toString().slice(0, 4)}`,
        publicKey: kp.publicKey.toString(),
        secret: mnemonic,
        type: 'generated',
      };
      setKeypairs([...keypairs, keypair]);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useKeypair() {
  return useContext(Context);
}
