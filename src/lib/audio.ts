const audio = (
  musicList: Array<string>,
  isPlay: boolean,
  isShuffleMode: boolean
) => {
  const musicListNumbers = musicList.length
  let currentSongIndex = 0

  const endedAudioHandler = () => {
    const nextSong = (currentSongIndex + 1) % musicListNumbers

    audioElement.src = musicList[nextSong]
    audioElement.play()
  }

  const audioElement = document.createElement('audio')

  audioElement.src = musicList[currentSongIndex]

  audioElement.addEventListener('ended', endedAudioHandler)

  if (isPlay) {
    audioElement.play()
  } else {
    audioElement.pause()
  }

  return audioElement
}

export default audio
