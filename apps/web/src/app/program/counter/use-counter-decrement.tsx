import { useMutation } from '@tanstack/react-query';
import { useCounterProgramAccount } from './counter-program-account-provider';

export function useCounterDecrement() {
  const { account, program } = useCounterProgramAccount();

  return useMutation({
    mutationKey: ['counter', 'decrement', { account }],
    mutationFn: () =>
      program.methods
        .decrement()
        .accounts({ counter: account.publicKey })
        .rpc(),
  });
}
