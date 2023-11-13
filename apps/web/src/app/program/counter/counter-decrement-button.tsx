import { Button } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterDecrement } from './use-counter-program-operations';

export function CounterDecrementButton({
  counter,
  refresh,
}: {
  counter: PublicKey;
  refresh: () => Promise<unknown> | unknown;
}) {
  const counterDecrement = useCounterDecrement({ counter });

  return (
    <Button
      variant="light"
      loading={counterDecrement.isPending}
      onClick={() =>
        counterDecrement.mutateAsync().then((signature) => {
          notifySignatureLink({ signature });
          return refresh();
        })
      }
    >
      Decrement
    </Button>
  );
}
