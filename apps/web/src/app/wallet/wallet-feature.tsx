import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { WalletDashboard } from './wallet-dashboard';
import { WalletGate } from './wallet-gate';

export default function WalletFeature() {
  const { publicKey } = useWallet();
  return (
    <WalletGate>
      <WalletDashboard publicKey={publicKey as PublicKey} />
    </WalletGate>
  );
}
