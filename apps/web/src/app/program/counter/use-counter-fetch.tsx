import { useQuery } from '@tanstack/react-query';
import { useCounterProgramAccount } from './counter-program-account-provider';
import { useCounterProgram } from './counter-program-provider';

export function useCounterFetch() {
  const { account } = useCounterProgramAccount();
  const { program } = useCounterProgram();

  return useQuery({
    queryKey: ['counter', 'fetch', { account }],
    queryFn: () => program.account.counter.fetch(account.publicKey),
  });
}
