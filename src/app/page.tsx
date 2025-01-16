'use client'
import { useState } from "react";
import {
  generateSeedPhrase,
  getAddressFromSeedPhrase,
  getBalance,
} from "@/utils/utils"; 

export default function Home() {
  const [seedPhrase, setSeedPhrase] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [recoverSeedPhrase, setRecoverSeedPhrase] = useState<string>("");

  const handleGenerateAccount = async () => {
    try {
      const generatedSeedPhrase = generateSeedPhrase();
      const generatedAddress = getAddressFromSeedPhrase(generatedSeedPhrase);
      setSeedPhrase(generatedSeedPhrase);
      setAddress(generatedAddress);
      await fetchBalance(generatedAddress);
    } catch (error) {
      console.error("Error generating account:", error);
    }
  };

  const handleRecoverAccount = async () => {
    try {
      if (!recoverSeedPhrase.trim()) {
        alert("Please enter a valid seed phrase.");
        return;
      }
      const recoveredAddress = getAddressFromSeedPhrase(recoverSeedPhrase);
      setSeedPhrase(recoverSeedPhrase);
      setAddress(recoveredAddress);
      await fetchBalance(recoveredAddress);
    } catch (error) {
      console.error("Error recovering account:", error);
      alert("Invalid seed phrase. Please check and try again.");
    }
  };

  const fetchBalance = async (walletAddress: string) => {
    try {
      const walletBalance = await getBalance(walletAddress);
      setBalance(walletBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("Unable to fetch balance");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Ethereum Account Manager</h1>

      {/* Generate Account Section */}
      <button
        onClick={handleGenerateAccount}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-6"
      >
        Generate New Seed Phrase and Address
      </button>

      {/* Recover Account Section */}
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-lg font-bold mb-2">Recover Account</h2>
        <textarea
          value={recoverSeedPhrase}
          onChange={(e) => setRecoverSeedPhrase(e.target.value)}
          placeholder="Enter your seed phrase"
          className="w-full p-2 border rounded mb-4"
          rows={3}
        />
        <button
          onClick={handleRecoverAccount}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Recover Account
        </button>
      </div>

      {/* Display Results Section */}
      {seedPhrase && (
        <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-2">Account Details</h2>
          <p className="mb-2">
            <span className="font-semibold">Seed Phrase:</span> {seedPhrase}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Address:</span> {address}
          </p>
          <p>
            <span className="font-semibold">Balance:</span>{" "}
            {balance !== null ? `${balance} ETH` : "Fetching..."}
          </p>
        </div>
      )}
    </div>
  );
}
