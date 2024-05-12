const ArtistList = ({ artists, onArtistClick }) => (
    <div className="p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Artists</h2>
        {artists.map((artist, index) => (
            <div
                key={index}
                className="cursor-pointer p-4 m-4 bg-white shadow-md rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => onArtistClick(artist)}
            >
                {artist}
            </div>
        ))}
    </div>
);

export default ArtistList;
