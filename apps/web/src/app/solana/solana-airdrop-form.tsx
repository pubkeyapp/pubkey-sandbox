import { Button, Group, Stack, TextInput } from '@mantine/core';
import { Connection } from '@solana/web3.js';
import { useState } from 'react';
import { useCluster } from '../cluster/cluster-provider';
import { UiExplorerLink } from '../ui/ui-explorer/ui-explorer-link';
import { notifySuccess } from '../ui/ui-notify/ui-notify';
import { ellipsify } from './ellipsify';
import { PublicKeyString } from './get-public-key';
import { useGetBalance } from './use-get-balance';
import { useRequestAirdrop } from './use-request-airdrop';

export function SolanaAirdropForm({
  connection,
  publicKey,
}: {
  connection: Connection;
  publicKey: PublicKeyString;
}) {
  const { cluster } = useCluster();
  const [amount, setAmount] = useState<number>(
    ['devnet', 'testnet'].includes(cluster?.network ?? '') ? 2 : 100
  );

  const query = useGetBalance({ connection, publicKey });
  const [destination, setDestination] = useState<string>(publicKey.toString());
  const requestAirdrop = useRequestAirdrop({ connection });

  return (
    <Stack>
      <TextInput
        label="Destination"
        placeholder="Destination"
        value={destination}
        onChange={(event) => setDestination(event.currentTarget.value)}
      />
      <TextInput
        label="Amount"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(Number(event.currentTarget.value))}
        type="number"
      />
      <Group justify="end">
        <Button
          loading={requestAirdrop.isPending}
          disabled={!publicKey || !destination.length || !amount}
          onClick={() => {
            requestAirdrop
              .mutateAsync({
                amount,
                destination,
              })
              .then(async (signature) => {
                notifySuccess({
                  title: 'Airdrop Successful',
                  message: (
                    <UiExplorerLink
                      label={ellipsify(signature)}
                      path={`tx/${signature}`}
                    >
                      Airdropped {amount} SOL to {ellipsify(destination)}.
                    </UiExplorerLink>
                  ),
                });
                await query.refetch();
              });
          }}
        >
          Request {amount} SOL
        </Button>
      </Group>
    </Stack>
  );
}
