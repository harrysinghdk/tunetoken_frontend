import { useState, useCallback } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

const contractAddress = '0x46d4271a40917a4587587De335986454e0179107';

const contractABI = [
  // Replace with your contract's ABI
  {
    "constant": true,
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

export default function Home() {
  const [accountData, setAccountData] = useState<AccountType>({});
  const [count, setCount] = useState("0");

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();

        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        // Fetch the count from the smart contract
        const contractCount = await contract.count();
        setCount(contractCount.toString())

        // Update state with the results
        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  return (
    <div
      className={`h-full flex flex-col before:from-white after:from-sky-200 py-2 ${inter.className}`}
    >
      <Header {...accountData} />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="grid gap-4">
          {accountData?.address ? (
            <>
              Logged in! Nice :) Current count: {count}
            </>
          ) : (
            <button
              onClick={_connectToMetaMask}
              className="bg-black text-white p-4 rounded-lg"
            >
              Connect to MetaMask
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
