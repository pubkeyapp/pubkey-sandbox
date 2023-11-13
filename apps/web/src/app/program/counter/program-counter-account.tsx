import { ProgramAccount } from '@coral-xyz/anchor';
import { Button, Group, Stack } from '@mantine/core';
import { ellipsify } from '../../solana/ellipsify';
import { UiDebugModal } from '../../ui/ui-debug-modal/ui-debug-modal';
import { UiExplorer } from '../../ui/ui-explorer/ui-explorer';
import { UiExplorerLink } from '../../ui/ui-explorer/ui-explorer-link';
import { notifySuccess } from '../../ui/ui-notify/ui-notify';
import {
  useCounterFetch,
  useCounterIncrement,
} from './use-counter-program-operations';

export function ProgramCounterAccount({
  account,
}: {
  account: ProgramAccount<{ count: number }>;
}) {
  const counterQuery = useCounterFetch({ counter: account.publicKey });
  const counterIncrement = useCounterIncrement({ counter: account.publicKey });

  return (
    <Stack key={account.publicKey.toBase58()}>
      <Group gap={2}>
        <UiExplorer
          label={ellipsify(account.publicKey.toBase58())}
          path={`account/${account.publicKey}`}
          copyValue={account.publicKey.toBase58()}
          copyLabel="Copy address"
        />
        <UiDebugModal data={account} />
      </Group>

      <Button.Group>
        <Button loading={counterQuery.isLoading}>
          {counterQuery.data?.count.toString()}
        </Button>
        <Button
          onClick={() =>
            counterIncrement.mutateAsync().then((signature) => {
              notifySuccess({
                message: (
                  <UiExplorerLink
                    label={ellipsify(signature)}
                    path={`tx/${signature}`}
                  >
                    View transaction {ellipsify(signature)}.
                  </UiExplorerLink>
                ),
              });
              return counterQuery.refetch();
            })
          }
          loading={counterQuery.isLoading || counterQuery.isPending}
        >
          Increment
        </Button>
      </Button.Group>
    </Stack>
  );
}
