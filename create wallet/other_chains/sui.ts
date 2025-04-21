
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';



// Generate a new Ed25519 Keypair
const keypair = new Ed25519Keypair();

// Get the public key
const publicKey = keypair.getPublicKey().toString();
// Get the secret key
const secretKey = Buffer.from(keypair.getSecretKey()).toString('hex');

/*

---

### 📌 **Concept**
This code generates a **Sui wallet keypair** using the Ed25519 curve, outputs:
- The **public key** (used to derive the Sui address)
- The **secret key** (used to sign transactions)

---

### 🧠 **How It Works (with Solana Comparison)**

| Step | 🟢 **Sui (via `@mysten/sui`)** | 🟣 **Solana (via `@solana/web3.js`)** |
|------|-------------------------------|--------------------------------------|
| **1. Key Generation** | `new Ed25519Keypair()` creates a random Ed25519 keypair | `Keypair.generate()` creates a random Ed25519 keypair |
| **2. Public Key Access** | `.getPublicKey().toString()` → Sui base58 format | `.publicKey.toBase58()` → Base58 encoded |
| **3. Private Key Access** | `.getSecretKey()` returns raw private key buffer | `.secretKey` returns 64-byte Uint8Array (private + public) |
| **4. Address Format** | Address = `0x...` derived from pubkey hash | Address = Base58-encoded public key |
| **5. Wallet Purpose** | Owns and signs for objects on Move VM | Owns accounts/programs on Solana Runtime |

---

### ✅ **Code Breakdown**

import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

// Step 1: Generate new keypair
const keypair = new Ed25519Keypair();

// Step 2: Extract public and secret keys
const publicKey = keypair.getPublicKey().toString(); // Base58 format
const secretKey = Buffer.from(keypair.getSecretKey()).toString('hex'); // 32-byte private key
```

- Sui uses `ed25519`, same as Solana.
- Public key is used to **derive a Sui address**, though it’s not directly shown here.
- `getSecretKey()` returns a raw private key (32 bytes) — not combined with public key like Solana.

---

### 🔐 **Security & Address Comparison**

| Feature | Sui | Solana |
|--------|-----|--------|
| Curve | `ed25519` | `ed25519` |
| Secret Key Format | 32-byte (raw private key only) | 64-byte (private + public) |
| Public Key Format | Base58 string | Base58 string |
| Address Format | Hex string (starts with `0x...`, derived from pubkey) | Public key itself (Base58) |
| Recovery | ✅ via mnemonic or imported keypair | ❌ Not native, manual recovery via secret key |
| Signing Model | Object ownership, resource-based | Account-based, program-signing model |

---

### 🧠 Summary
- **Sui and Solana both use ed25519**, but differ in how they treat keys and accounts.
- **Solana’s public key _is_ the address**, while **Sui derives address from public key hash** (`0x...` style).
- **Secret key structure** in Solana contains more data (`64 bytes`), while Sui uses only the **raw private key** (`32 bytes`).
- Sui supports **mnemonic recovery** natively through `fromMnemonic()` (unlike Solana).

*/