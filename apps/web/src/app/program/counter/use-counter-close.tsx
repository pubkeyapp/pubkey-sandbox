import { useMutation } from '@tanstack/react-query';
import { useCounterProgramAccount } from './counter-program-account-provider';

export function useCounterClose() {
  const { account, program } = useCounterProgramAccount();

  return useMutation({
    mutationKey: ['counter', 'close', { account }],
    mutationFn: () =>
      program.methods
        .closeCounter()
        .accounts({ counter: account.publicKey })
        .rpc(),
  });
}
