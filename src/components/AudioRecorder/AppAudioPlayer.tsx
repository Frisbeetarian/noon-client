import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const AppAudioPlayer = ({ src, onPlay, autoPlay, ...props }) => {
  return (
    <AudioPlayer src={src} onPlay={onPlay} autoPlay={autoPlay} {...props} />
  )
}

export default AppAudioPlayer
