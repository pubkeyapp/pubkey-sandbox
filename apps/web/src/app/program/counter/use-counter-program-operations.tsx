import { BN, Program } from '@coral-xyz/anchor';
import { CounterIDL } from '@pubkey-sandbox/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAnchorProvider } from '../use-anchor-provider';

export const CounterProgramID = new PublicKey(
  'CouTv1Zs5BKfEvnxQsvPYEHPY8DYfcnWNWwfUWVSobV'
);

export function useCounterFetchAll() {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useQuery({
    queryKey: ['counter', 'fetch-all'],
    queryFn: () => program.account.counter.all(),
  });
}

export function useCounterFetch({ counter }: { counter: PublicKey }) {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useQuery({
    queryKey: ['counter', 'fetch', { counter }],
    queryFn: () => program.account.counter.fetch(counter),
  });
}

export function useCounterIncrement({ counter }: { counter: PublicKey }) {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useMutation({
    mutationKey: ['counter', 'increment', { counter }],
    mutationFn: () => program.methods.increment().accounts({ counter }).rpc(),
  });
}

export function useCounterDecrement({ counter }: { counter: PublicKey }) {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useMutation({
    mutationKey: ['counter', 'decrement', { counter }],
    mutationFn: () => program.methods.decrement().accounts({ counter }).rpc(),
  });
}

export function useCounterClose({ counter }: { counter: PublicKey }) {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useMutation({
    mutationKey: ['counter', 'close', { counter }],
    mutationFn: () =>
      program.methods.closeCounter().accounts({ counter }).rpc(),
  });
}

export function useCounterSet({ counter }: { counter: PublicKey }) {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useMutation({
    mutationKey: ['counter', 'decrement', { counter }],
    mutationFn: (value: number) =>
      program.methods.set(new BN(value)).accounts({ counter }).rpc(),
  });
}
export function useCounterInitialize() {
  const provider = useAnchorProvider();
  const program = new Program(CounterIDL, CounterProgramID, provider);

  return useMutation({
    mutationKey: ['counter', 'initialize'],
    mutationFn: ({ keypair }: { keypair: Keypair }) =>
      program.methods
        .initializeCounter()
        .accounts({ counter: keypair.publicKey })
        .signers([keypair])
        .rpc(),
  });
}
