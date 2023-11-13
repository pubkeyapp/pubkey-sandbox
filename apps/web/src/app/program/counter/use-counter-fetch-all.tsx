import { useQuery } from '@tanstack/react-query';
import { useCounterProgram } from './counter-program-provider';

export function useCounterFetchAll() {
  const { program } = useCounterProgram();

  return useQuery({
    queryKey: ['counter', 'fetch-all'],
    queryFn: () => program.account.counter.all(),
  });
}
