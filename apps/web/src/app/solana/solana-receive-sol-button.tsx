import { Button, ButtonProps, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';
import { PublicKeyString } from './get-public-key';

export function SolanaReceiveSolButton({
  publicKey,
  ...props
}: ButtonProps & { publicKey: PublicKeyString }) {
  return (
    <Button
      onClick={() =>
        modals.open({
          title: `Receive SOL`,
          children: (
            <Stack>
              <div>Send SOL to this address to receive it in your wallet.</div>
              <Text c="dimmed" size="xs" ta="center">
                <UiExplorer
                  label={publicKey.toString()}
                  path={`account/${publicKey}`}
                />
                <UiCopyButton
                  value={publicKey.toString()}
                  label="Copy address"
                />
              </Text>
            </Stack>
          ),
        })
      }
      {...props}
    >
      Receive
    </Button>
  );
}
