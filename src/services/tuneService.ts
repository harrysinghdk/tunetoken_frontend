import { ethers } from "ethers";
import contractABI from "../../abi.json"

const contractAddress = '0xc0e7ff9AAa598B58B6326CCD5b63a5A1536e3f18';

export async function getTotalSupply() {
    const ethereum = window.ethereum;
    
    if (ethereum === "undefined") {
        return null;
    }

    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(ethereum);

    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    // Fetch the count from the smart contract
    const totalSupply = await contract.totalSupply();
    
    return totalSupply.toString()
}

export async function getBalanceOf(address:string) {

    const ethereum = window.ethereum;
    
    if (ethereum === "undefined") {
        return null;
    }
    

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // Fetch the count from the smart contract
    const balance = await contract.getBalanceOf(address);
    
    return balance.toString()
}

export async function buySong(artist:string, song: string) {

    const ethereum = window.ethereum;
    
    if (ethereum === "undefined") {
        return null;
    }
    

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // Fetch the count from the smart contract
    await contract.buySong(artist, song);
}

export async function getIPFSValue(artist:string, song: string) {

    const ethereum = window.ethereum;
    
    if (ethereum === "undefined") {
        return null;
    }
    

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner()

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // Fetch the count from the smart contract
    const ipfs = await contract.getIPFSValue(artist, song);
    return ipfs.toString()
}

export async function getAllArtists() {
    try {
        const ethereum = window.ethereum;
    
        if (ethereum === "undefined") {
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);

        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const artistAddresses = await contract.getAllArtistAddresses();
        
        return artistAddresses
    } catch (e) {
        return []
    }
}

export async function getSongsByArtist(address: String) {
    try {
        const ethereum = window.ethereum;
    
        if (ethereum === "undefined") {
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);

        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const artistAddresses = await contract.getSongsByArtist(address);
        
        return artistAddresses
    } catch (e) {
        return []
    }
}

export async function addSong(songName:string, songIPFS: string) {
    try {
        const ethereum = window.ethereum;
    
        if (ethereum === "undefined") {
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner()

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        await contract.addSong(songName, songIPFS);

        return true
    } catch (e) {
        console.log(e)
        return false;
    }
}