import { Group, Stack } from '@mantine/core';
import { ellipsify } from '../../solana/ellipsify';
import { UiDebugModal } from '../../ui/ui-debug-modal/ui-debug-modal';
import { UiExplorer } from '../../ui/ui-explorer/ui-explorer';
import { CounterCloseButton } from './counter-close-button';
import { CounterDecrementButton } from './counter-decrement-button';
import { CounterIncrementButton } from './counter-increment-button';
import { useCounterProgramAccount } from './counter-program-account-provider';
import { CounterValueButton } from './counter-value-button';

export function ProgramCounterAccount() {
  const { account } = useCounterProgramAccount();

  return (
    <Stack>
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
        <CounterCloseButton />
      </Group>
      <Group justify="center">
        <Group gap="xs">
          <CounterDecrementButton />
          <CounterValueButton />
          <CounterIncrementButton />
        </Group>
      </Group>
    </Stack>
  );
}
