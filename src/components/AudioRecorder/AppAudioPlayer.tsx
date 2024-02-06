import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const AppAudioPlayer = ({ src, onPlay, ...props }) => {
  return (
    <AudioPlayer
      autoPlay
      src={src}
      onPlay={onPlay}
      // Spread any other props to allow customizing the player further
      {...props}
    />
  )
}

export default AppAudioPlayer
