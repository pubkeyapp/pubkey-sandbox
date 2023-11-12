import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { SolanaWalletDashboard } from '../solana/solana-wallet-dashboard';
import { WalletGate } from './wallet-gate';

export default function WalletFeature() {
  const { publicKey } = useWallet();
  return (
    <WalletGate>
      <SolanaWalletDashboard publicKey={publicKey as PublicKey} />
    </WalletGate>
  );
}
