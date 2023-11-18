import { Button, ButtonProps } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useConnection } from '@solana/wallet-adapter-react';
import { useCluster } from '../cluster/cluster-provider';
import { PublicKeyString } from './get-public-key';
import { SolanaAirdropForm } from './solana-airdrop-form';

export function SolanaAirdropSol({
  publicKey,
  ...props
}: ButtonProps & { publicKey: PublicKeyString }) {
  const { cluster } = useCluster();
  const { connection } = useConnection();

  if (cluster.network === 'mainnet-beta') {
    return null;
  }
  return (
    <Button
      onClick={() =>
        modals.open({
          title: `Request Airdrop on cluster ${cluster.name}`,
          children: (
            <SolanaAirdropForm connection={connection} publicKey={publicKey} />
          ),
        })
      }
      {...props}
    >
      Airdrop
    </Button>
  );
}
