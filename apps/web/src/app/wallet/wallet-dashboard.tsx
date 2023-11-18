import { Card, Stack } from '@mantine/core';
import { PublicKeyString } from '../solana/get-public-key';
import { SolanaGetTokenAccounts } from '../solana/solana-get-token-accounts';
import { SolanaGetTransactionHistory } from '../solana/solana-get-transaction-history';
import { WalletHero } from './wallet-hero';

export function WalletDashboard({ publicKey }: { publicKey: PublicKeyString }) {
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
