import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useEffect, useRef, useState } from 'react';
import { useCluster } from './cluster-provider';

export function ClusterUiModal({
  hideModal,
  show,
}: {
  hideModal: () => void;
  show: boolean;
}) {
  const { addCluster } = useCluster();
  const [name, setName] = useState('');
  const [network, setNetwork] = useState<WalletAdapterNetwork | undefined>();
  const [endpoint, setEndpoint] = useState('');
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">Add Cluster</h3>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endpoint"
          className="input input-bordered w-full"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={network}
          onChange={(e) => setNetwork(e.target.value as WalletAdapterNetwork)}
        >
          <option value={undefined}>Select a network</option>
          <option value={WalletAdapterNetwork.Devnet}>Devnet</option>
          <option value={WalletAdapterNetwork.Testnet}>Testnet</option>
          <option value={WalletAdapterNetwork.Mainnet}>Mainnet</option>
        </select>

        <div className="modal-action">
          <div className="join space-x-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                addCluster({ name, network, endpoint });
                hideModal();
              }}
            >
              Save
            </button>
            <button onClick={hideModal} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
