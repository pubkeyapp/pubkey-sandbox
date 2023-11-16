import { Keypair as SolanaKeypair } from '@solana/web3.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createContext, ReactNode, useContext } from 'react';

export interface Keypair {
  name: string;
  publicKey: string;
  secret?: string;
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
  addKeypair: (keypair: Keypair) => void;
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
    addKeypair: (keypair: Keypair) => {
      setKeypairs([...keypairs, keypair]);
    },
    deleteKeypair: (keypair: Keypair) => {
      setKeypairs(keypairs.filter((item) => item.name !== keypair.name));
    },
    setKeypair: (keypair: Keypair) => setKeypair(keypair),
    importKeypair: (secret: string) => {
      console.log('secret', secret);
    },
    generateKeypair: () => {
      const kp = SolanaKeypair.generate();
      const keypair: Keypair = {
        name: `${kp.publicKey.toString().slice(0, 4)}`,
        publicKey: kp.publicKey.toString(),
        secret: kp.secretKey.toString(),
      };
      setKeypairs([...keypairs, keypair]);
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useKeypair() {
  return useContext(Context);
}
