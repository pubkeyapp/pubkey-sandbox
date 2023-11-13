import { Button } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterIncrement } from './use-counter-program-operations';

export function CounterIncrementButton({
  counter,
  refresh,
}: {
  counter: PublicKey;
  refresh: () => Promise<unknown> | unknown;
}) {
  const counterIncrement = useCounterIncrement({ counter });

  return (
    <Button
      variant="light"
      loading={counterIncrement.isPending}
      onClick={() =>
        counterIncrement.mutateAsync().then((signature) => {
          notifySignatureLink({ signature });
          return refresh();
        })
      }
    >
      Increment
    </Button>
  );
}
