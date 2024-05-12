import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Create an IPFS instance pointing to your local or remote node
const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

function IPFSUploader({ onUploadComplete }) {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload to IPFS
  const uploadToIPFS = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      // Prepare the file for upload
      const added = await ipfs.add(file);
      // Retrieve the CID of the uploaded file
      const cid = added.cid.toString();
      // Call the onUploadComplete function with the CID
      onUploadComplete(cid);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      alert("Error uploading file to IPFS.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload MP3 to IPFS</h2>
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 focus:bg-white transition duration-150 ease-in-out shadow-sm p-2"
      />

      <button
        onClick={uploadToIPFS}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
      >
        Upload to IPFS
      </button>
    </div>
  );
}

export default IPFSUploader;
