import { Button } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { notifyWarning } from '../../ui/ui-notify/ui-notify';
import {
  useCounterFetch,
  useCounterSet,
} from './use-counter-program-operations';

export function CounterValueButton({ counter }: { counter: PublicKey }) {
  const counterQuery = useCounterFetch({ counter });
  const counterSet = useCounterSet({ counter });

  const value = counterQuery.data?.count.toString() ?? '0';

  return (
    <Button
      variant="light"
      loading={counterQuery.isLoading}
      onClick={() => {
        const input = parseInt(
          prompt('Enter a value to set the counter to:', value) || '0'
        );
        if (isNaN(input) || input < 0 || input === Number(value)) {
          notifyWarning({ message: 'Invalid input' });
          return;
        }
        return counterSet.mutateAsync(input).then((signature) => {
          notifySignatureLink({ signature });
          return counterQuery.refetch();
        });
      }}
    >
      {value}
    </Button>
  );
}
