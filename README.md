# Cardano Wallet Connector via CIP-30

A React TypeScript application that implements a Cardano wallet connection feature using the CIP-30 protocol. This project allows users to connect to any Cardano-compatible wallet extension installed in their browser and retrieve wallet data.

## 🚀 Features

- **Wallet Detection**: Automatically detects installed Cardano wallet extensions (Nami, Eternl, Flint, etc.)
- **CIP-30 Integration**: Uses the official Cardano Improvement Proposal 30 (CIP-30) for wallet communication
- **Wallet Data Access**: Retrieves and logs wallet address, ADA balance, assets, and NFTs
- **Modern UI**: Clean, responsive interface with modal wallet selection
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern utility-first CSS framework for styling
- **Create React App**: Stable and reliable React development environment

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
│   ├── App.css                    # App-specific styles
│   ├── index.tsx                  # App entry point
│   └── index.css                  # Global styles
├── public/
│   ├── index.html                 # HTML entry point
│   └── icon/
│       └── cardano.webp           # Cardano icon
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Create React App** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **CIP-30 Protocol** - Cardano wallet communication standard
- **@emurgo/cardano-serialization-lib-browser** - Cardano serialization library

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
   # or
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

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
1. User clicks "Connect Wallet" button
2. App detects available Cardano wallets
3. User selects a wallet from the modal
4. App connects via CIP-30 and displays wallet address
5. User can disconnect or change wallet via dropdown

## 🎯 Usage

### For Users
1. Install a Cardano wallet extension (Nami, Eternl, Flint, etc.)
2. Open the application in your browser
3. Click the "Connect Wallet" button
4. Select your wallet from the list
5. Approve the connection in your wallet
6. View your connected wallet address

### For Developers
The main components are:

**WalletConnector.tsx** - Main UI component
- Handles wallet detection and connection
- Manages UI state (modal, loading, connected state)
- Displays wallet address and connection status

**walletUtils.ts** - Utility functions
- `getAvailableWallets()` - Detects installed wallets
- `getWalletData()` - Fetches wallet information
- CIP-30 type definitions

**WalletConnector.css** - Component styling
- Custom CSS for wallet connector UI
- Modal animations and responsive design

## 🎨 Styling

The project uses a combination of:
- **Tailwind CSS** - For utility classes and responsive design
- **Custom CSS** - For component-specific styling in `WalletConnector.css`
- **PostCSS** - For processing and optimizing CSS

## 🚀 Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server (alias)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🔮 Future Enhancements

The project is structured to easily add:
- Wallet data display in UI (balance, assets, NFTs)
- Transaction creation and signing
- Asset management interface
- Network switching (Mainnet/Testnet)
- Multiple wallet support
- Enhanced Tailwind CSS integration

## 📚 CIP-30 Resources

- [CIP-30 Specification](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030)
- [Cardano Developer Portal](https://developers.cardano.org/)
- [Wallet API Documentation](https://docs.cardano.org/cardano-components/cardano-wallet/api/)

## 🛠️ Development Notes

- The project uses Create React App for stability and ease of development
- Tailwind CSS is configured and ready for use
- All wallet interactions are handled through the CIP-30 protocol
- TypeScript provides full type safety for wallet operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple wallet extensions
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.
