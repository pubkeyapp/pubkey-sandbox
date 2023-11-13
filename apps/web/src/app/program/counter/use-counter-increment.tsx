import { useMutation } from '@tanstack/react-query';
import { useCounterProgramAccount } from './counter-program-account-provider';

export function useCounterIncrement() {
  const { account, program } = useCounterProgramAccount();

  return useMutation({
    mutationKey: ['counter', 'increment', { account }],
    mutationFn: () =>
      program.methods
        .increment()
        .accounts({ counter: account.publicKey })
        .rpc(),
  });
}
