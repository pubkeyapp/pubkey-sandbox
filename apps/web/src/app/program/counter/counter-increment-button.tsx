import { Button } from '@mantine/core';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterFetch } from './use-counter-fetch';
import { useCounterIncrement } from './use-counter-increment';

export function CounterIncrementButton() {
  const counterIncrement = useCounterIncrement();
  const counterQuery = useCounterFetch();

  return (
    <Button
      variant="light"
      loading={counterIncrement.isPending}
      onClick={() =>
        counterIncrement.mutateAsync().then((signature) => {
          notifySignatureLink({ signature });
          return counterQuery.refetch();
        })
      }
    >
      Increment
    </Button>
  );
}
