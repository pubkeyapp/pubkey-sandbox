import { Button, ButtonProps } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { SolanaTransferTokenForm } from './solana-transfer-token-form';

export function SolanaSendTokenButton({
  account,
  accountOwner,
  accountData,
  tokenProgramId,
  ...props
}: ButtonProps & {
  account: PublicKey;
  accountOwner: PublicKey;
  accountData: {
    info: {
      mint: string;
      owner: string;
      tokenAmount: { decimals: number };
    };
  };
  tokenProgramId: PublicKey;
}) {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  return (
    <Button
      onClick={() =>
        modals.open({
          title: `Send Tokens`,
          children: (
            <SolanaTransferTokenForm
              account={account}
              accountOwner={accountOwner}
              accountData={accountData}
              connection={connection}
              sendTransaction={sendTransaction}
              tokenProgramId={tokenProgramId}
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
