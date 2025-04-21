import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk"

const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);


// Create a new account
let newWallet = Account.generate();

console.log(`user's address is: ${newWallet.accountAddress}`);
console.log(`user's private key is: ${newWallet.privateKey}`);
console.log(`user's public key is: ${newWallet.publicKey}`);

/*
---

### 📌 **Concept**
This code creates a new **Aptos wallet** (account) using the official `@aptos-labs/ts-sdk`.  
It gives you:
- A **private key** (for signing)
- A **public key** (for identity)
- A derived **account address**

---

### 🧠 **How It Works (with Solana Comparison)**

| Step | 🟢 **Aptos (Move-based chain)** | 🟣 **Solana (Rust-based chain)** |
|------|-------------------------|-----------------------------|
| **1. SDK Setup** | `AptosConfig` connects to Aptos mainnet/testnet | No setup needed for keypair generation |
| **2. Account Generation** | `Account.generate()` creates a random keypair using **ed25519** | `Keypair.generate()` also uses **ed25519** |
| **3. Public Address** | `accountAddress` is derived from the public key with a hashing algorithm | `publicKey` is directly the wallet address (Base58) |
| **4. Output Keys** | Shows `privateKey`, `publicKey`, `accountAddress` | Shows `publicKey`, `secretKey` (64-byte keypair) |
| **5. Mnemonic Support** | Optional — SDK also supports mnemonic-based accounts | No native mnemonic, usually done manually |

---

### ✅ **Code Breakdown**

import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

// Step 1: Setup connection to Aptos network
const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);

// Step 2: Generate a new wallet (account)
let newWallet = Account.generate(); // Generates ed25519 keypair

// Step 3: Log credentials
console.log(`user's address is: ${newWallet.accountAddress}`);
console.log(`user's private key is: ${newWallet.privateKey}`);
console.log(`user's public key is: ${newWallet.publicKey}`);
```

---

### 🔐 **Security & Identity Comparison**

| Feature | Aptos | Solana |
|--------|-------|--------|
| Key Curve | `ed25519` | `ed25519` |
| Address Format | Hex (derived from pubkey hash) | Base58 (direct pubkey) |
| Public Key | Separate from address | Also used as address |
| Private Key | 32-byte secret (hex or Uint8Array) | 64-byte secret (private + pub combined) |
| Recovery | Can use mnemonic (optional) | No native mnemonic support |
| Account Abstraction | Supported (via Move modules) | Not native (requires program logic) |

---

*/