import { Card, Stack } from '@mantine/core';
import { PublicKey } from '@solana/web3.js';
import { SolanaGetTokenAccounts } from '../solana/solana-get-token-accounts';
import { SolanaGetTransactionHistory } from '../solana/solana-get-transaction-history';
import { WalletHero } from './wallet-hero';

export function WalletDashboard({ publicKey }: { publicKey: PublicKey }) {
  return (
    <Stack>
      <WalletHero publicKey={publicKey} />
      <Stack>
        <Card withBorder>
          <SolanaGetTokenAccounts publicKey={publicKey} />
        </Card>
        <Card withBorder>
          <SolanaGetTransactionHistory publicKey={publicKey} />
        </Card>
      </Stack>
    </Stack>
  );
}
