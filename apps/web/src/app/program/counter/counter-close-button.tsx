import { Button } from '@mantine/core';
import { notifySignatureLink } from '../../ui/ui-explorer/ui-explorer-link';
import { useCounterClose } from './use-counter-close';
import { useCounterFetchAll } from './use-counter-fetch-all';

export function CounterCloseButton() {
  const fetchAll = useCounterFetchAll();
  const counterClose = useCounterClose();

  return (
    <Button
      variant="subtle"
      loading={counterClose.isPending}
      color="red"
      onClick={() =>
        counterClose.mutateAsync().then(async (signature) => {
          notifySignatureLink({ signature });
          return fetchAll.refetch();
        })
      }
    >
      Close
    </Button>
  );
}
