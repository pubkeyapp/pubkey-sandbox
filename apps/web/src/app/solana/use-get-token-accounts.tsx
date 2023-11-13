import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

export function useGetTokenAccounts({ publicKey }: { publicKey: PublicKey }) {
  const { connection } = useConnection();
  return useQuery({
    queryKey: [
      'token-accounts',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: async () => {
      const [tokenAccounts, token2022Accounts] = await Promise.all([
        connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        }),
        connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_2022_PROGRAM_ID,
        }),
      ]);
      return [...tokenAccounts.value, ...token2022Accounts.value].map(
        ({ account, pubkey }) => {
          return {
            account,
            pubkey,
            programId:
              account.data.program === 'spl-token'
                ? TOKEN_PROGRAM_ID
                : TOKEN_2022_PROGRAM_ID,
          };
        }
      );
    },
  });
}
