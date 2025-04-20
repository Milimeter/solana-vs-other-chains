import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);

console.log('Address:', account.address);
console.log('Private Key:', privateKey);

//EVM (Ethereum, BSC, Polygon, etc.) 