import { ProgramAccount } from '@coral-xyz/anchor';
import { Group, Stack } from '@mantine/core';
import { ellipsify } from '../../solana/ellipsify';
import { UiDebugModal } from '../../ui/ui-debug-modal/ui-debug-modal';
import { UiExplorer } from '../../ui/ui-explorer/ui-explorer';
import { CounterCloseButton } from './counter-close-button';
import { CounterDecrementButton } from './counter-decrement-button';
import { CounterIncrementButton } from './counter-increment-button';
import { CounterValueButton } from './counter-value-button';
import {
  useCounterFetch,
  useCounterFetchAll,
} from './use-counter-program-operations';

export function ProgramCounterAccount({
  account,
}: {
  account: ProgramAccount<{ count: number }>;
}) {
  const allAccountsQuery = useCounterFetchAll();
  const counterQuery = useCounterFetch({ counter: account.publicKey });

  return (
    <Stack key={account.publicKey.toBase58()}>
      <Group justify="space-between">
        <Group gap={2}>
          <UiExplorer
            label={ellipsify(account.publicKey.toBase58())}
            path={`account/${account.publicKey}`}
            copyValue={account.publicKey.toBase58()}
            copyLabel="Copy address"
          />
          <UiDebugModal data={account} />
        </Group>
        <CounterCloseButton
          counter={account.publicKey}
          refresh={() => allAccountsQuery.refetch()}
        />
      </Group>
      <Group justify="center">
        <Group gap="xs">
          <CounterDecrementButton
            counter={account.publicKey}
            refresh={() => counterQuery.refetch()}
          />
          <CounterValueButton counter={account.publicKey} />
          <CounterIncrementButton
            counter={account.publicKey}
            refresh={() => counterQuery.refetch()}
          />
        </Group>
      </Group>
    </Stack>
  );
}
