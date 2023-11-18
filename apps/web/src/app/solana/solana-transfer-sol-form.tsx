import { Button, Grid, Group, Stack, TextInput } from '@mantine/core';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import { useState } from 'react';

import { UiExplorerButton } from '../ui/ui-explorer/ui-explorer-button';
import { ellipsify } from './ellipsify';
import { PublicKeyString } from './get-public-key';
import { useTransferSol } from './use-transfer-sol';

export function SolanaTransferSolForm({
  connection,
  publicKey,
  sendTransaction,
}: {
  connection: Connection;
  publicKey: PublicKeyString;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const transferSol = useTransferSol({
    connection,
    publicKey,
    sendTransaction,
  });

  return (
    <Stack>
      <Grid>
        <Grid.Col span={9}>
          <TextInput
            placeholder="Enter destination"
            value={destination}
            onChange={(event) => setDestination(event.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => setAmount(Number(event.currentTarget.value))}
            type="number"
          />
        </Grid.Col>
      </Grid>
      <Group justify="space-between">
        <div>
          {signature && (
            <UiExplorerButton
              path={`tx/${signature}`}
              label={ellipsify(signature)}
            />
          )}
        </div>
        <Button
          loading={transferSol.isPending}
          disabled={!publicKey || !destination.length || !amount}
          onClick={() => {
            setSignature('');
            transferSol
              .mutateAsync({
                amount,
                destination,
              })
              .then((signature) => {
                if (signature) {
                  setSignature(signature);
                }
              });
          }}
        >
          Send {amount} SOL
        </Button>
      </Group>
      {transferSol.isError && (
        <div>Error: {transferSol.error?.message.toString()}</div>
      )}
    </Stack>
  );
}
