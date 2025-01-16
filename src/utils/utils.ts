import { ethers, TransactionResponse } from "ethers";
const providerUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`;

export function generateSeedPhrase(): string {
  const wallet = ethers.Wallet.createRandom();
  if (!wallet.mnemonic) throw new Error("Failed to generate mnemonic");
  return wallet.mnemonic.phrase;
}

export function getAddressFromSeedPhrase(seedPhrase: string): string {
  const wallet = ethers.Wallet.fromPhrase(seedPhrase);
  return wallet.address;
}

export async function sendEther(
  senderPrivateKey: string,
  recipientAddress: string,
  amountInEther: string
): Promise<TransactionResponse> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(senderPrivateKey, provider);
  const tx = {
    to: recipientAddress,
    value: ethers.parseEther(amountInEther), 
  };
  return await wallet.sendTransaction(tx);
}

export async function getBalance(address: string): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}
