import { Button } from '@mantine/core';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterDecrement } from './use-counter-decrement';
import { useCounterFetch } from './use-counter-fetch';

export function CounterDecrementButton() {
  const counterDecrement = useCounterDecrement();
  const counterQuery = useCounterFetch();

  return (
    <Button
      variant="light"
      loading={counterDecrement.isPending}
      onClick={() =>
        counterDecrement.mutateAsync().then((signature) => {
          notifySignatureLink({ signature });
          return counterQuery.refetch();
        })
      }
    >
      Decrement
    </Button>
  );
}
