import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk"

const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);


// Create a new account
let newWallet = Account.generate();

console.log(`user's address is: ${newWallet.accountAddress}`);
console.log(`user's private key is: ${newWallet.privateKey}`);
console.log(`user's public key is: ${newWallet.publicKey}`);