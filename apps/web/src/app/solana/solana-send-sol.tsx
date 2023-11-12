import { Button, Card, Group, Stack, TextInput, Title } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';

import { useSendSol } from './use-send-sol';

export function SolanaSendSol({ publicKey }: { publicKey: PublicKey }) {
  const [amount, setAmount] = useState<number>(0);
  const [destination, setDestination] = useState<string>('');
  const query = useSendSol({ publicKey });

  return (
    <Card>
      <Stack>
        <Title order={3}>Send SOL</Title>
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
        <Group>
          <Button
            disabled={
              !publicKey || !destination.length || !amount || query.isPending
            }
            onClick={() => {
              query.mutate({ destination: new PublicKey(destination), amount });
            }}
          >
            Send {amount} SOL
          </Button>
        </Group>
        {query.isPending && <div>Pending...</div>}
        {query.isError && <div>Error: {query.error?.message.toString()}</div>}
        {query.data && <div>Transaction: {query.data}</div>}
      </Stack>
    </Card>
  );
}
