import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui';
import { WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';
import { ReactNode, useCallback, useMemo } from 'react';
import { useCluster } from './cluster/cluster-provider';

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster();
  const endpoint = useMemo(
    () => cluster?.endpoint ?? clusterApiUrl('devnet'),
    [cluster]
  );
  const wallets = useMemo(
    () => [new SolflareWalletAdapter({ network: cluster?.network })],
    [cluster]
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
