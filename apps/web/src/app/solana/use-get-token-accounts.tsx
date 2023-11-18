import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { getPublicKey, PublicKeyString } from './get-public-key';

export function useGetTokenAccounts({
  publicKey,
}: {
  publicKey: PublicKeyString;
}) {
  const { connection } = useConnection();
  return useQuery({
    queryKey: [
      'token-accounts',
      { endpoint: connection.rpcEndpoint, publicKey: publicKey.toString() },
    ],
    queryFn: async () => {
      const [tokenAccounts, token2022Accounts] = await Promise.all([
        connection.getParsedTokenAccountsByOwner(getPublicKey(publicKey), {
          programId: TOKEN_PROGRAM_ID,
        }),
        connection.getParsedTokenAccountsByOwner(getPublicKey(publicKey), {
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
