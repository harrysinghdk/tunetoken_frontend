import { useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import MetaMaskConnection from "@/components/MetaMaskConnection";
import ArtistList from "@/components/ArtistList";
import SongList from "@/components/SongList";
import SongAdder from "@/components/SongAdder";
import AudioPlayer from "@/components/AudioPlayer";
import { addSong, buySong, getIPFSValue, getSongsByArtist } from "@/services/tuneService";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [accountData, setAccountData] = useState({ address: '', balance: '', chainId: '', network: '' });
  const [artists, setArtists] = useState([]);
  const [curArtist, setCurArtist] = useState('');
  const [songName, setSongName] = useState('');
  const [songList, setSongList] = useState([]);
  const [currentSongUrl, setCurrentSongUrl] = useState('');

  const handleMetaMaskConnected = (data) => {
    setAccountData(data);
    setArtists(data.artists);
  };

  const handleArtistClick = async (artist) => {
    setCurArtist(artist);
    // Replace with actual service call logic if needed
    setSongList(await getSongsByArtist(artist));
  };

  const handleSongClick = async (song) => {
    let cid = await getIPFSValue(curArtist, song);
    if (cid === '') {
      await buySong(curArtist, song);
      cid = await getIPFSValue(curArtist, song);
    }
    setCurrentSongUrl(`http://localhost:8080/ipfs/${cid}`);
  };

  const handleAddSong = async (cid) => {
    // Replace with actual service call logic
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
              <ArtistList artists={artists} onArtistClick={handleArtistClick} />
              <SongList songList={songList} onSongClick={handleSongClick} />
              <SongAdder onSongNameChange={setSongName} onUploadComplete={handleAddSong} />
              {currentSongUrl && <AudioPlayer songUrl={currentSongUrl} />}
            </>
          ) : (
            <MetaMaskConnection onConnected={handleMetaMaskConnected} />
          )}
        </div>
      </div>
    </div>
  );
}
