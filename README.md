# Cardano Wallet Connector via CIP-30

A React TypeScript application that implements a Cardano wallet connection feature using the CIP-30 protocol. This project allows users to connect to any Cardano-compatible wallet extension installed in their browser and retrieve wallet data.

## 🚀 Features

- **Wallet Detection**: Automatically detects installed Cardano wallet extensions (Nami, Eternl, Flint, etc.)
- **CIP-30 Integration**: Uses the official Cardano Improvement Proposal 30 (CIP-30) for wallet communication
- **Wallet Data Access**: Retrieves and logs wallet address, ADA balance, assets, and NFTs
- **Modern UI**: Clean, responsive interface with modal wallet selection
- **TypeScript**: Fully typed for better development experience

## 📁 Project Structure

```
coding_project/
├── src/
│   ├── components/
│   │   └── WalletConnector.tsx    # Main wallet connection component
│   ├── utils/
│   │   └── walletUtils.ts         # CIP-30 types and helper functions
│   ├── styles/
│   │   └── WalletConnector.css    # Component styling
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles
├── public/
│   └── index.html                 # HTML entry point
├── package.json                   # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CIP-30 Protocol** - Cardano wallet communication standard

## 📦 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd coding_project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 🔧 How It Works

### 1. Wallet Detection
The application uses the `getAvailableWallets()` function in `walletUtils.ts` to scan for installed Cardano wallet extensions by checking the `window.cardano` object.

### 2. CIP-30 Protocol
The project implements the CIP-30 interface which provides:
- `enable()` - Request wallet connection
- `getUsedAddresses()` - Get wallet addresses
- `getBalance()` - Get ADA balance (in lovelace)
- `getAssets()` - Get list of assets/tokens
- And other CIP-30 methods

### 3. User Flow
1. User clicks "Wallet Sync" button (top-right corner)
2. App detects available Cardano wallets
3. User selects a wallet from the modal
4. App connects via CIP-30 and logs wallet data to console

## 🎯 Usage

### For Users
1. Install a Cardano wallet extension (Nami, Eternl, Flint, etc.)
2. Open the application in your browser
3. Click the "Wallet Sync" button in the top-right corner
4. Select your wallet from the list
5. Approve the connection in your wallet
6. Check the browser console for wallet data

### For Developers
The main components are:

**WalletConnector.tsx** - Main UI component
- Handles wallet detection and connection
- Manages UI state (modal, loading, etc.)
- Logs wallet data to console

**walletUtils.ts** - Utility functions
- `getAvailableWallets()` - Detects installed wallets
- `getWalletData()` - Fetches wallet information
- CIP-30 type definitions

## 🔍 Console Output

After successful wallet connection, the following data is logged to the browser console:
- **Wallet Address(es)**: Array of used addresses
- **ADA Balance**: Current balance in ADA (converted from lovelace)
- **Assets**: List of all assets/tokens in the wallet
- **NFTs**: Filtered list of NFTs (assets with length > 56 characters)

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

The project is structured to easily add:
- Wallet data display in UI
- Transaction creation and signing
- Asset management interface
- Network switching (Mainnet/Testnet)
- Multiple wallet support

## 📚 CIP-30 Resources

- [CIP-30 Specification](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030)
- [Cardano Developer Portal](https://developers.cardano.org/)
- [Wallet API Documentation](https://docs.cardano.org/cardano-components/cardano-wallet/api/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple wallet extensions
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
