import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from './home';

const ClusterFeatureList = lazy(() => import('./cluster/cluster-feature-list'));
const SolanaFeature = lazy(() => import('./solana/solana-feature'));

export function AppRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="/home" /> },
    { path: '/clusters', element: <ClusterFeatureList /> },
    { path: '/home', element: <Home /> },
    { path: '/solana/*', element: <SolanaFeature /> },
  ]);
}
