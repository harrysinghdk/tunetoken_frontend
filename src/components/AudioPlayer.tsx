const AudioPlayer = ({ songUrl }) => (
    <div className="mt-4">
        <audio controls src={songUrl} className="w-full">
            Your browser does not support the audio element.
        </audio>
    </div>
);

export default AudioPlayer;
