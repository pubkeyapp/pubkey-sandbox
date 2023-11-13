import { BN } from '@coral-xyz/anchor';
import { useMutation } from '@tanstack/react-query';

import { useCounterProgramAccount } from './counter-program-account-provider';

export function useCounterSet() {
  const { account, program } = useCounterProgramAccount();

  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: (value: number) =>
      program.methods
        .set(new BN(value))
        .accounts({ counter: account.publicKey })
        .rpc(),
  });
}
