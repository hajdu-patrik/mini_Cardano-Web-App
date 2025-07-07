import { useState } from 'react';
import '../styles/WalletConnector.css';
import { getAvailableWallets, getWalletData, CardanoWallet } from '../utils/walletUtils';

const WalletConnector: React.FC = () => {
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);
  const [showList, setShowList] = useState(false);

  const [connecting, setConnecting] = useState(false);

  const handleSyncClick = () => {
    const foundWallets = getAvailableWallets();
    setWallets(foundWallets);
    setShowList(true);
  };

  const handleWalletSelect = async (wallet: CardanoWallet) => {
    setConnecting(true);
    try {
      const api = await wallet.enable();
      setShowList(false);
      // Fetch and log wallet data
      const data = await getWalletData(api);
      console.log('Wallet Address(es):', data.addresses);
      console.log('ADA Balance:', data.balance);
      console.log('Assets:', data.assets);
      console.log('NFTs:', data.nfts);
    } catch (err) {
      alert('Failed to connect to wallet.');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="wallet-connector">
      <button className="wallet-sync-btn" onClick={handleSyncClick} disabled={connecting}>
        Wallet Sync
      </button>
      {showList && wallets.length > 0 && (
        <div className="wallet-list-modal">
          <div className="wallet-list">
            <div className="wallet-list-header">
              <h4>Select a Wallet</h4>
              <button className="close-btn" onClick={() => setShowList(false)}>×</button>
            </div>
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                className="wallet-list-item"
                onClick={() => handleWalletSelect(wallet)}
                disabled={connecting}
              >
                {wallet.icon && <img src={wallet.icon} alt={wallet.name} className="wallet-icon" />}
                {wallet.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {showList && wallets.length === 0 && (
        <div className="wallet-list-modal">
          <div className="wallet-list">
            <div className="wallet-list-header">
              <h4>No Wallets Found</h4>
              <button className="close-btn" onClick={() => setShowList(false)}>×</button>
            </div>
            <p>No Cardano wallet extensions detected in your browser.</p>
            <p>Please install a wallet extension like Nami, Eternl, or Flint.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnector; 