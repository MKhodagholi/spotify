const getAudioFromIndexDB = (songId: string) => {
  const audio = undefined

  return audio
}

let timer = setTimeout(() => {}, 300)

function timeout(ms: number) {
  return new Promise(resolve => {
    clearTimeout(timer)
    timer = setTimeout(resolve, ms)
  })
}

const setAudioSrc = async (
  trackObj: { id: string; url: string; name: string },
  audioElement: HTMLAudioElement,
  trackTitleElement: HTMLElement,
  isPlay: boolean,
) => {
  trackTitleElement.innerText = trackObj.name

  await timeout(300)

  const savedAudio = getAudioFromIndexDB(trackObj.id)

  if (savedAudio) {
    audioElement.src = savedAudio
  } else {
    audioElement.src = trackObj.url
  }

  if (isPlay) audioElement.play()
}

const useAudio = (data: {
  musicList: Array<{ id: string; url: string; name: string }>
  trackTitleElement: any
  playElement?: HTMLElement
  shuffleElement?: HTMLElement
  nextTrackElement?: HTMLElement
  previewTrackElement?: HTMLElement
  repeatElement?: HTMLElement
  onPlay?: (isPlay: boolean) => void
  onShuffle?: (isShuffle: boolean) => void
  onRepeat?: (isRepeat: boolean) => void
}): [HTMLAudioElement, number] => {
  const { musicList, trackTitleElement } = data

  const musicListNumbers = musicList.length

  let isShuffle = false
  let isPlay = false
  let isRepeat = false

  let currentSongIndex = 0

  const audioElement = document.createElement('audio')
  audioElement.style.display = 'none'

  setAudioSrc(
    musicList[currentSongIndex],
    audioElement,
    trackTitleElement,
    isPlay,
  )

  const playPauseClickHandler = () => {
    if (isPlay) {
      audioElement.pause()
    } else {
      audioElement.play()
    }
    isPlay = !isPlay
    if (data.onPlay) data.onPlay(isPlay)
  }

  const nextTrackHandler = () => {
    let nextSongIndex
    if (isShuffle) {
      nextSongIndex = Math.floor(Math.random() * musicListNumbers)
    } else {
      nextSongIndex = currentSongIndex + 1

      if (nextSongIndex === musicListNumbers)
        nextSongIndex = musicListNumbers - 1
    }

    currentSongIndex = nextSongIndex

    setAudioSrc(
      musicList[nextSongIndex],
      audioElement,
      trackTitleElement,
      isPlay,
    )
  }

  const previewTrackHandler = () => {
    let previewSognIndex = currentSongIndex - 1

    if (previewSognIndex < 0) previewSognIndex = 0

    currentSongIndex = previewSognIndex

    setAudioSrc(
      musicList[previewSognIndex],
      audioElement,
      trackTitleElement,
      isPlay,
    )
  }

  const repeatClickHandler = () => {
    if (data.onRepeat) data.onRepeat(isRepeat)
    isRepeat = !isRepeat
  }

  const shuffleClickHandler = () => {
    if (data.onShuffle) data.onShuffle(isShuffle)
    isShuffle = !isShuffle
  }

  const endedAudioHandler = () => {
    let nextSongIndex

    if (isRepeat) nextSongIndex = currentSongIndex
    else if (isShuffle) {
      nextSongIndex = Math.floor(Math.random() * musicListNumbers)
    } else {
      nextSongIndex = currentSongIndex + 1
      if (nextSongIndex === musicListNumbers) {
        playPauseClickHandler()
        return
      }
    }

    currentSongIndex = nextSongIndex
    setAudioSrc(
      musicList[nextSongIndex],
      audioElement,
      trackTitleElement,
      isPlay,
    )

    audioElement.play()
  }

  data?.playElement?.addEventListener('click', playPauseClickHandler)
  data?.nextTrackElement?.addEventListener('click', nextTrackHandler)
  data?.previewTrackElement?.addEventListener('click', previewTrackHandler)
  data?.repeatElement?.addEventListener('click', repeatClickHandler)
  data?.shuffleElement?.addEventListener('click', shuffleClickHandler)

  audioElement.addEventListener('ended', endedAudioHandler)

  document.body.appendChild(audioElement)

  return [audioElement, currentSongIndex]
}

export default useAudio
