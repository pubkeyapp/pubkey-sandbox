import { Loader } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './app-layout';
import { AppRoutes } from './app-routes';
import { SolanaWalletProvider } from './solana-wallet-provider';
import { UiTheme } from './ui/ui-theme/ui-theme';
import { ClusterProvider } from './cluster/cluster-provider';

const client = new QueryClient();

export function App() {
  return (
    <ClusterProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <UiTheme>
            <SolanaWalletProvider>
              <Suspense fallback={<Loader />}>
                <AppLayout>
                  <AppRoutes />
                </AppLayout>
              </Suspense>
            </SolanaWalletProvider>
          </UiTheme>
        </BrowserRouter>
      </QueryClientProvider>
    </ClusterProvider>
  );
}
