import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);

console.log('Address:', account.address);
console.log('Private Key:', privateKey);

//EVM (Ethereum, BSC, Polygon, etc.) 

/*

---

### 📌 **Concept**
This code creates a new wallet/account for any **EVM-compatible chain** (Ethereum, BSC, Polygon, etc.) using the [`viem`](https://viem.sh/) library.  
It involves:
- A randomly generated **private key**  
- A derived **public address**

---

### 🧠 **How It Works (with Solana Comparison)**

| Step | 🔷 EVM (via `viem`) | 🟣 Solana (via `@solana/web3.js`) |
|------|---------------------|-----------------------------------|
| **1. Generate Key** | `generatePrivateKey()` creates a **32-byte** private key using `secp256k1` | `Keypair.generate()` creates a **64-byte** keypair using `ed25519` |
| **2. Derive Account** | `privateKeyToAccount()` uses the private key to derive the EVM address (checksummed hex) | Public key is derived directly from the keypair |
| **3. Output Address** | `account.address` → e.g., `0xabc123...` | `keypair.publicKey.toBase58()` → e.g., `H39uE...` |
| **4. Output Secret** | Outputs raw 32-byte private key in hex (e.g., `0x6a4f...`) | Outputs full 64-byte secret key (private + public) in hex |

---

### 🧪 **Code Explanation**

import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// Step 1: Generate raw private key
const privateKey = generatePrivateKey(); // EVM-compatible, 32 bytes (hex format)

// Step 2: Derive full account (with address) from the private key
const account = privateKeyToAccount(privateKey);

// Step 3: Log the public address and private key
console.log('Address:', account.address); // e.g., 0xabc123...
console.log('Private Key:', privateKey);  // e.g., 0x6a4f...


---

### 🔐 **Security Comparison**
| Feature | EVM (`viem`) | Solana |
|--------|--------------|--------|
| Key Curve | `secp256k1` | `ed25519` |
| Private Key | 32 bytes (raw hex) | 64 bytes (includes private + public) |
| Public Address Format | `0x...` hex (42 chars) | Base58 (44 chars) |
| Recovery | Raw private key (no mnemonic by default) | No native mnemonic, full secret key must be saved |

---

*/