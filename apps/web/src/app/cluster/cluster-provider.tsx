import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createContext, ReactNode, useContext } from 'react';

export interface Cluster {
  name: string;
  endpoint: string;
  network?: WalletAdapterNetwork;
  active?: boolean;
}

export const defaultClusters: Cluster[] = [
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    network: WalletAdapterNetwork.Devnet,
  },
  { name: 'local', endpoint: 'http://localhost:8899' },
  {
    name: 'mainnet',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: WalletAdapterNetwork.Mainnet,
  },
  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    network: WalletAdapterNetwork.Testnet,
  },
];

const clusterAtom = atomWithStorage<Cluster>('cluster', defaultClusters[0]);
const clustersAtom = atomWithStorage<Cluster[]>('clusters', defaultClusters);

const activeClustersAtom = atom<Cluster[]>((get) => {
  const clusters = get(clustersAtom);
  const cluster = get(clusterAtom);
  return clusters.map((item) => ({
    ...item,
    active: item.name === cluster.name,
  }));
});

const activeClusterAtom = atom<Cluster>((get) => {
  const clusters = get(activeClustersAtom);

  return clusters.find((item) => item.active) || clusters[0];
});

export interface ClusterProviderContext {
  cluster: Cluster;
  clusters: Cluster[];
  addCluster: (cluster: Cluster) => void;
  deleteCluster: (cluster: Cluster) => void;
  setCluster: (cluster: Cluster) => void;
  getExplorerUrl(path: string): string;
}

const Context = createContext<ClusterProviderContext>(
  {} as ClusterProviderContext
);

export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = useAtomValue(activeClusterAtom);
  const clusters = useAtomValue(activeClustersAtom);
  const setCluster = useSetAtom(clusterAtom);
  const setClusters = useSetAtom(clustersAtom);

  const value: ClusterProviderContext = {
    cluster,
    clusters,
    addCluster: (cluster: Cluster) => {
      setClusters([...clusters, cluster]);
    },
    deleteCluster: (cluster: Cluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name));
    },
    setCluster: (cluster: Cluster) => setCluster(cluster),
    getExplorerUrl: (path: string) =>
      `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCluster() {
  return useContext(Context);
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = '';
  switch (cluster.network) {
    case WalletAdapterNetwork.Devnet:
      suffix = 'devnet';
      break;
    case WalletAdapterNetwork.Mainnet:
      suffix = '';
      break;
    case WalletAdapterNetwork.Testnet:
      suffix = 'testnet';
      break;
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
      break;
  }

  return suffix.length ? `?cluster=${suffix}` : '';
}
