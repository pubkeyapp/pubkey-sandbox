import { Button } from '@mantine/core';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { notifyWarning } from '../../ui/ui-notify/ui-notify';
import { useCounterFetch } from './use-counter-fetch';
import { useCounterSet } from './use-counter-set';

export function CounterValueButton() {
  const counterQuery = useCounterFetch();
  const counterSet = useCounterSet();

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
