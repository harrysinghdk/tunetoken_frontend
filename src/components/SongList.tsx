const SongList = ({ songList, onSongClick }) => (
    <div className="p-4 min-w-[220px]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Songs</h2>
        {songList.map((song, index) => (
            <div
                key={index}
                className="min-w-[220px] cursor-pointer p-4 m-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => onSongClick(song)}
            >
                {song}
            </div>
        ))}
    </div>
);

export default SongList;
