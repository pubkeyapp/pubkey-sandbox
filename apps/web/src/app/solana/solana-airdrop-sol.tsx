import { Button, ButtonProps } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useCluster } from '../cluster/cluster-provider';
import { SolanaAirdropForm } from './solana-airdrop-form';

export function SolanaAirdropSol({
  publicKey,
  ...props
}: ButtonProps & { publicKey: PublicKey }) {
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
