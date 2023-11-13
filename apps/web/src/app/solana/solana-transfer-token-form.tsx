import { Button, Grid, Group, Stack, TextInput } from '@mantine/core';
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { useState } from 'react';

import { UiExplorerButton } from '../ui/ui-explorer/ui-explorer-button';
import { ellipsify } from './ellipsify';

import { useTransferToken } from './use-transfer-token';

export function SolanaTransferTokenForm({
  connection,
  account,
  accountData,
  accountOwner,
  sendTransaction,
  tokenProgramId,
}: {
  account: PublicKey;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  accountOwner: PublicKey;
  connection: Connection;
  sendTransaction: (
    transaction: VersionedTransaction,
    connection: Connection
  ) => Promise<string>;
  tokenProgramId: PublicKey;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const transferSol = useTransferToken({
    account,
    accountData,
    accountOwner,
    connection,
    sendTransaction,
    tokenProgramId,
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
          disabled={!account || !destination.length || !amount}
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
          Send {amount} Tokens
        </Button>
      </Group>
      {transferSol.isError && (
        <div>Error: {transferSol.error?.message.toString()}</div>
      )}
    </Stack>
  );
}
