import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from './home';

const ClusterFeatureList = lazy(() => import('./cluster/cluster-feature'));
const KeypairFeature = lazy(() => import('./keypair/keypair-feature'));
const ProgramFeature = lazy(() => import('./program/program-feature'));
const TokenFeature = lazy(() => import('./token/token-feature'));
const WalletFeature = lazy(() => import('./wallet/wallet-feature'));

export function AppRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="/home" /> },
    { path: '/clusters', element: <ClusterFeatureList /> },
    { path: '/home', element: <Home /> },
    { path: '/keypairs/*', element: <KeypairFeature /> },
    { path: '/programs/*', element: <ProgramFeature /> },
    { path: '/token/*', element: <TokenFeature /> },
    { path: '/wallet/*', element: <WalletFeature /> },
  ]);
}
