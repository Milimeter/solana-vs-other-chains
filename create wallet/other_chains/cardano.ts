import * as CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";
import { generateMnemonic, mnemonicToEntropy } from "bip39";
// Hardened derivation function
const hardened = (num: number) => {
  return 0x80000000 + num;
};

const getAddressKeyPair = (
  rootKey: CardanoWasm.Bip32PrivateKey,
  index: number
) => {
  const accountKey = rootKey
    .derive(hardened(1852)) // purpose
    .derive(hardened(1815)) // coin type
    .derive(hardened(0)) // account
    .derive(0) // change
    .derive(index); // address index

  const privateKey = accountKey.to_raw_key();
  const publicKey = privateKey.to_public();
  return { privateKey, publicKey };
};


function main() {
  const mnemonic = generateMnemonic(24);
  const entropy = Buffer.from(mnemonicToEntropy(mnemonic), "hex");
  const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
    entropy,
    Buffer.from("")
  );
  const { privateKey: senderPrivateKey, publicKey: senderPublicKey } =
    getAddressKeyPair(rootKey, 0);

  

  console.log("Mnemonic:", mnemonic);
  console.log("Public Key:", senderPublicKey.to_hex());
  console.log("Private Key:", senderPrivateKey.to_hex());
}


/* 


### 📌 **Concept**
This script generates a **Cardano wallet** using a **24-word mnemonic**, performs **BIP32 key derivation**, and derives a keypair using the **Shelley wallet standard** (purpose `1852'`, coin type `1815'`).


### 🧠 **How It Works (with Solana Comparison)**

| Step | 🟠 **Cardano (UTXO + Shelley HD Wallets)** | 🟣 **Solana (Ed25519 Keypair)** |
|------|--------------------------------------------|----------------------------------|
| **1. Mnemonic Generation** | Uses `generateMnemonic(24)` from `bip39` for 24-word phrase | No native mnemonic; keypair is random with `Keypair.generate()` |
| **2. Entropy Conversion** | Converts mnemonic to entropy with `mnemonicToEntropy()` | N/A |
| **3. Root Key Generation** | Derives `rootKey` from entropy using `from_bip39_entropy()` | N/A – keypair is not mnemonic-derived |
| **4. Hierarchical Derivation (BIP32)** | Derives path: `m/1852'/1815'/0'/0/index` using `derive()` | No derivation path or hierarchy in standard Solana keypair |
| **5. Keypair Output** | Extracts private and public key from derived node | Public key used directly as address in Solana |
| **6. Address Derivation** | You can generate address from the keypair (not shown in this code) | Public key = address (Base58) |

---

### ✅ **Code Breakdown**

import * as CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";
import { generateMnemonic, mnemonicToEntropy } from "bip39";

- Libraries used for mnemonic generation and Cardano key derivation.

const hardened = (num: number) => 0x80000000 + num;

- Function for **hardened derivation** (required by BIP32 for private key security).

const getAddressKeyPair = (rootKey, index) => {
  const accountKey = rootKey
    .derive(hardened(1852)) // BIP purpose for Shelley wallets
    .derive(hardened(1815)) // Coin type for Cardano
    .derive(hardened(0))    // First account
    .derive(0)              // External (0) or Internal/Change (1)
    .derive(index);         // Address index

  const privateKey = accountKey.to_raw_key();     // 32-byte Ed25519
  const publicKey = privateKey.to_public();       // Public key
  return { privateKey, publicKey };
};

- Mimics **BIP44/49/84-style derivation**, common in HD wallets (but adapted for Cardano’s path).


function main() {
  const mnemonic = generateMnemonic(24); // Step 1: Generate 24-word phrase
  const entropy = Buffer.from(mnemonicToEntropy(mnemonic), "hex"); // Convert to entropy
  const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
    entropy,
    Buffer.from("")
  ); // Generate root key from entropy

  

  const { privateKey, publicKey } = getAddressKeyPair(rootKey, 0); // Derive address keypair (m/.../0)

  console.log("Mnemonic:", mnemonic);
  console.log("Public Key:", publicKey.to_hex());
  console.log("Private Key:", privateKey.to_hex());
}


---

### 🔐 **Security & Addressing Comparison**

| Feature | Cardano | Solana |
|--------|---------|--------|
| Curve | `ed25519` | `ed25519` |
| Derivation Standard | **BIP32/BIP44** compliant HD structure | No hierarchy – one keypair |
| Address Format | Derived from public key + network tag (not shown) | Public key = address (Base58) |
| Private Key Format | 32-byte hex (from raw key) | 64-byte (private + public) |
| Mnemonic Support | ✅ Native with BIP39 (12/15/24 words) | ❌ Not native |
| Derivation Path | `m/1852'/1815'/0'/0/index` | N/A |

---

### 🧠 Summary
- **Cardano** uses a **deterministic** HD wallet structure with **standard derivation paths**.
- **Solana** uses **non-deterministic key generation** with a flat structure — no derivation paths or mnemonic out-of-the-box.
- Both use **ed25519**, but Cardano adds a whole derivation tree + mnemonic logic, while Solana is simpler and faster to generate.


*/