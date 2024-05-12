import IPFSUploader from "./IPFSUploader";

const SongAdder = ({ onSongNameChange, onUploadComplete }) => (
    <div className="flex flex-col space-y-4 p-4">
        <input
            type="text"
            placeholder="Song Name"
            onChange={(e) => onSongNameChange(e.target.value)}
            className="flex-1 py-2 px-4 rounded-lg border border-gray-300"
        />
        <IPFSUploader onUploadComplete={onUploadComplete} />
    </div>
);

export default SongAdder;
