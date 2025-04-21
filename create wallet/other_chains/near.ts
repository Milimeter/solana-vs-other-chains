import { KeyPair } from 'near-api-js';

const keypair = KeyPair.fromRandom('ed25519');

console.log('Public Key:', keypair.getPublicKey().toString());


/*

---

### 📌 **Concept**
This script generates a new **NEAR keypair** using the `ed25519` algorithm.  
It returns:
- A **public key** (used as part of your NEAR account setup)
- A **private key** (used to sign transactions)

---

### 🧠 **How It Works (with Solana Comparison)**

| Step | 🟤 **NEAR (via `near-api-js`)** | 🟣 **Solana (via `@solana/web3.js`)** |
|------|------------------------------|--------------------------------------|
| **1. Key Generation** | `KeyPair.fromRandom('ed25519')` generates a random ed25519 keypair | `Keypair.generate()` generates a random ed25519 keypair |
| **2. Public Key Access** | `.getPublicKey().toString()` returns public key in `ed25519:...` format | `.publicKey.toBase58()` returns Base58 encoded pubkey |
| **3. Private Key** | Stored internally and can be accessed via `.secretKey` if needed | Stored in `.secretKey`, 64-byte Uint8Array |
| **4. Mnemonic Support** | ❌ Not native in this code, but possible via custom tools | ❌ Not natively supported |
| **5. Address Format** | Human-readable named accounts (e.g. `alice.near`) → linked to public key | Public key **is** the address (Base58) |

---

### ✅ **Code Breakdown**

import { KeyPair } from 'near-api-js';

const keypair = KeyPair.fromRandom('ed25519'); // Generate random keypair (ed25519)

console.log('Public Key:', keypair.getPublicKey().toString()); // Prints "ed25519:..." style key


- `KeyPair` is NEAR’s abstraction of a public/private keypair.
- NEAR uses **ed25519**, like Solana — cryptographic behavior is the same.
- The `publicKey` is used to associate a key with a NEAR account (e.g. when creating or recovering an account).

---

### 🔐 **Security & Identity Comparison**

| Feature | NEAR | Solana |
|--------|------|--------|
| Curve | `ed25519` | `ed25519` |
| Private Key Access | `.secretKey` (Base58 string) | 64-byte Uint8Array (Hex) |
| Public Key Format | `ed25519:...` Base58-style | Base58 |
| Account Format | Human-readable (e.g., `bob.near`) | Public key as address |
| Recovery Option | Not in this snippet, but possible | Manual with secretKey |
| Signature Scheme | Uses public key & nonce (access keys) | Signs tx directly with pubkey |

---

### 🧠 Summary
- NEAR and Solana **both use ed25519**, so key generation is cryptographically similar.
- But NEAR uses a **named-account system**, where public keys are tied to readable IDs like `username.near`, unlike Solana's address-as-public-key model.
- This code generates only the **raw keypair** — to link it to a named NEAR account, you’d need to use NEAR’s wallet or CLI tools.

*/