import { Button, ButtonProps } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { SolanaTransferSolForm } from './solana-transfer-sol-form';

export function SolanaSendSolButton({
  publicKey,
  ...props
}: ButtonProps & { publicKey: PublicKey }) {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  return (
    <Button
      onClick={() =>
        modals.open({
          title: `Send SOL`,
          children: (
            <SolanaTransferSolForm
              connection={connection}
              publicKey={publicKey}
              sendTransaction={sendTransaction}
            />
          ),
        })
      }
      {...props}
    >
      Send
    </Button>
  );
}
