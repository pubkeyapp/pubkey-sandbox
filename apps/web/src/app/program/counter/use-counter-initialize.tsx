import { Keypair } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { useCounterProgram } from './counter-program-provider';

export function useCounterInitialize() {
  const { program } = useCounterProgram();

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
