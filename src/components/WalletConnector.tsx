import React, { useState, useEffect } from 'react';
import { getAvailableWallets, getWalletData, CardanoWallet } from '../utils/walletUtils';
import '../styles/WalletConnector.css';
const siteIcon = '/icon/cardano.webp';

const WalletConnector: React.FC = () => {
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);
  const [showList, setShowList] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showNoWalletsModal, setShowNoWalletsModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSyncClick = () => {
    const foundWallets = getAvailableWallets();
    setWallets(foundWallets);
    if (foundWallets.length === 0) {
      setShowNoWalletsModal(true);
    } else {
    setShowList(true);
    }
  };

  const handleWalletSelect = async (wallet: CardanoWallet) => {
    setConnecting(true);
    try {
      const api = await wallet.enable();
      setShowList(false);
      const data = await getWalletData(api);
      if (data.addresses && data.addresses.length > 0) {
        const address = data.addresses[0];
        const formatted = `${address.slice(0, 4)}...${address.slice(-6)}`;
        setConnectedAddress(formatted);
        setIsConnected(true);
      }
    } catch (err) {
      alert('Failed to connect to wallet.');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedAddress('');
    setIsConnected(false);
    setWallets([]);
    setDropdownOpen(false);
  };

  const handleChangeWallet = () => {
    setShowList(true);
    setDropdownOpen(false);
  };

  // ESC key closes the wallet list modal
  useEffect(() => {
    if (!showList) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowList(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showList]);

  // Dropdown close on ESC or outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.wallet-dropdown') && !(e.target as HTMLElement).closest('.wallet-sync-btn')) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="wallet-connector">
      {!isConnected ? (
      <button className="wallet-connect-btn" onClick={handleSyncClick} disabled={connecting}>
          Conncet Wallet
        </button>
      ) : (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button className="wallet-connect-btn wallet-connected-btn" onClick={() => setDropdownOpen((v) => !v)}>
            <img src={siteIcon} alt="Site Icon" className="site-icon" />
            {connectedAddress}
      </button>
          {dropdownOpen && (
            <div className="wallet-dropdown">
              <div className="wallet-dropdown-header">
                <img src={siteIcon} alt="Site Icon" className="site-icon" />
                <span className="wallet-dropdown-address">{connectedAddress}</span>
              </div>
              <button className="wallet-list-item" onClick={handleDisconnect} style={{ width: '100%', textAlign: 'left' }}>Disconnect Wallet</button>
              <button className="wallet-list-item" onClick={handleChangeWallet} style={{ width: '100%', textAlign: 'left' }}>Change Wallet</button>
            </div>
          )}
        </div>
      )}
      {showNoWalletsModal && (
        <div className="wallet-list-modal">
          <div className="wallet-list">
            <div className="wallet-list-header">
              <h4>No Cardano wallets found on this device.</h4>
              <button className="close-btn" onClick={() => setShowNoWalletsModal(false)} aria-label="Close">✖</button>
            </div>
          </div>
        </div>
      )}
      {showList && wallets.length > 0 && (
        <div className="wallet-list-modal">
          <div className="wallet-list">
            <div className="wallet-list-header">
              <h4>Select a Wallet</h4>
              <button className="close-btn" onClick={() => setShowList(false)} aria-label="Close">✖</button>
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
    </div>
  );
};

export default WalletConnector; 