import { useCallback } from "react";
import { ethers } from "ethers";
import { getAllArtists, getBalanceOf } from "@/services/tuneService";

const MetaMaskConnection = ({ onConnected }) => {
  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      const provider = new ethers.BrowserProvider(ethereum);
      const network = await provider.getNetwork();
      const balance = await getBalanceOf(address);
      const artists = await getAllArtists();

      onConnected({
        address,
        balance: balance,
        chainId: network.chainId.toString(),
        network: network.name,
        artists,
      });
    } catch (error) {
      alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
    }
  }, [onConnected]);

  return (
    <button onClick={_connectToMetaMask} className="bg-black text-white p-4 rounded-lg">
      Connect to MetaMask
    </button>
  );
};

export default MetaMaskConnection;
