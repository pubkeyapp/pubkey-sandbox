import { Button, ButtonProps, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { PublicKey } from '@solana/web3.js';
import { UiCopyButton } from '../ui/ui-explorer/ui-copy-button';
import { UiExplorer } from '../ui/ui-explorer/ui-explorer';

export function SolanaReceiveSolButton({
  publicKey,
  ...props
}: ButtonProps & { publicKey: PublicKey }) {
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
                  label={publicKey.toBase58()}
                  path={`account/${publicKey}`}
                />
                <UiCopyButton
                  value={publicKey.toBase58()}
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
