import { Card, Stack } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { SolanaGetTransactionHistory } from './solana-get-transaction-history';
import { SolanaWalletHero } from './solana-wallet-hero';

export function SolanaWalletDashboard({ publicKey }: { publicKey: PublicKey }) {
  return (
    <Stack>
      <SolanaWalletHero publicKey={publicKey} />
      <Card withBorder>
        <SolanaGetTransactionHistory publicKey={publicKey} />
      </Card>
    </Stack>
  );
}
