import { useState, useCallback } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { ethers } from "ethers";
import { addSong, buySong, getAllArtists, getBalanceOf, getIPFSValue, getSongsByArtist } from "@/services/tuneService";
import IPFSUploader from "@/components/IPFSUploader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [accountData, setAccountData] = useState({ address: '', balance: '', chainId: '', network: '' });
  const [artists, setArtists] = useState([]);
  const [songName, setSongName] = useState('');
  const [songList, setSongList] = useState([]);
  const [curArtist, setCurArtist] = useState('');
  const [currentSongUrl, setCurrentSongUrl] = useState('');

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      const provider = new ethers.BrowserProvider(ethereum);
      const network = await provider.getNetwork();
      const balance = await getBalanceOf(address);
      const artists = await getAllArtists();

      setArtists(artists);

      setAccountData({
        address,
        balance: balance,
        chainId: network.chainId.toString(),
        network: network.name,
      });
    } catch (error) {
      alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
    }
  }, []);

  async function addressClick(address) {
    setCurArtist(address);
    setSongList(await getSongsByArtist(address));
  }

  async function getSongClick(song) {
    let cid = await getIPFSValue(curArtist, song);
    
    if (cid == '') {
      await buySong(curArtist, song);
    }

    cid = await getIPFSValue(curArtist, song);

    // Set the current song URL to the public IPFS gateway URL with the CID
    setCurrentSongUrl(`http://localhost:8080/ipfs/${cid}`);
  }

  // Function to handle the addition of a song after IPFS upload
  const handleAddSong = async (cid) => {
    await addSong(songName, cid);
    alert('Song added successfully with CID: ' + cid);
  };

  return (
    <div className={`h-full flex flex-col before:from-white after:from-sky-200 py-2 ${inter.className}`}>
      <Header {...accountData} />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="grid gap-4">
          {accountData?.address ? (
            <>
              <div className="p-6">
                <div className="flex space-x-4">
                  <div className="p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Artists</h2>
                    {artists.map((artist, index) => (
                      <div 
                        key={index}
                        className="cursor-pointer p-4 m-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => addressClick(artist)}
                      >
                        {artist}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 min-w-[220px]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Songs</h2>
                    {songList.map((song, index) => (
                      <div 
                        key={index}
                        className="min-w-[220px] cursor-pointer p-4 m-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => getSongClick(song)}
                      >
                        {song}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <input
                  type="text"
                  placeholder="Song Name"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-300"
                />
                <IPFSUploader onUploadComplete={handleAddSong} />
              </div>
            </>
          ) : (
            <button
              onClick={_connectToMetaMask}
              className="bg-black text-white p-4 rounded-lg"
            >
              Connect to MetaMask
            </button>
          )}
          {currentSongUrl && (
            <div className="mt-4">
              <audio controls src={currentSongUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
