import { Button } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterClose } from './use-counter-program-operations';

export function CounterCloseButton({
  counter,
  refresh,
}: {
  counter: PublicKey;
  refresh: () => Promise<unknown> | unknown;
}) {
  const counterClose = useCounterClose({ counter });

  return (
    <Button
      variant="subtle"
      loading={counterClose.isPending}
      color="red"
      onClick={() =>
        counterClose.mutateAsync().then(async (signature) => {
          notifySignatureLink({ signature });
          return refresh();
        })
      }
    >
      Close
    </Button>
  );
}
