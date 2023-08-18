import { getMinuteAudio, getSecondAudio } from '../lib/audio'
import { DownloadService } from '../lib/indexDB'

export interface AudioMusicList {
  id: string
  albumId: string
  url: string
  name: string
}

const getAudioFromIndexDB = async (songId: string) => {
  let audio: undefined | string = undefined
  const data = await DownloadService.getDataDownloadItem(songId)

  if (data) {
    const blobUrl = URL.createObjectURL(data)
    audio = blobUrl
  }

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
  trackObj: { id: string; albumId: string; url: string; name: string },
  audioElement: HTMLAudioElement,
  isPlay: boolean,
  trackTitleElement?: HTMLElement,
  endTimeAudioElement?: HTMLElement,
  timerElement?: HTMLInputElement,
) => {
  if (trackTitleElement) trackTitleElement.innerText = trackObj.name

  await timeout(300)

  const savedAudio = await getAudioFromIndexDB(trackObj.id)

  if (savedAudio) {
    audioElement.src = savedAudio
  } else {
    audioElement.src = trackObj.url
    const res = await fetch(trackObj.url)

    const blob = await res.blob()

    const blobData = new Blob([blob])

    DownloadService.saveSongDataInIndexDB({
      id: trackObj.id,
      name: trackObj.name,
      albumId: trackObj.albumId,
      data: blobData,
    })
  }

  audioElement.onloadedmetadata = function () {
    const duration = audioElement.duration

    if (timerElement) {
      timerElement.min = '0'
      timerElement.max = String(duration)
    }

    if (endTimeAudioElement) {
      const minuteAudio = getMinuteAudio(duration)
      const secondAudio = getSecondAudio(duration)

      endTimeAudioElement.innerText = `${minuteAudio}:${secondAudio}`
    }
  }

  if (isPlay) audioElement.play()
}

const useAudio = (data: {
  musicList: Array<AudioMusicList>
  startFrom?: number
  setCurrentSongId?: (songId: string) => void
  trackTitleElement?: any
  playElement?: HTMLElement
  shuffleElement?: HTMLElement
  nextTrackElement?: HTMLElement
  previewTrackElement?: HTMLElement
  repeatElement?: HTMLElement
  timerElement?: HTMLInputElement
  startTimerElement?: HTMLElement
  endTimerElement?: HTMLElement
  animateTrackElement?: HTMLElement
  thumbTimerElement?: HTMLElement
  onPlay?: (isPlay: boolean) => void
  onShuffle?: (isShuffle: boolean) => void
  onRepeat?: (isRepeat: boolean) => void
}): [HTMLAudioElement, number] => {
  const { musicList, trackTitleElement } = data

  const musicListNumbers = musicList.length

  let isShuffle = false
  let isPlay = false
  let isRepeat = false

  let currentSongIndex = data?.startFrom ?? 0

  const audioElement = document.createElement('audio')
  audioElement.style.display = 'none'

  setAudioSrc(
    musicList[currentSongIndex],
    audioElement,
    isPlay,
    trackTitleElement,
    data?.endTimerElement,
    data?.timerElement,
  )

  if (data.onPlay) data.onPlay(isPlay)

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
    }

    currentSongIndex = nextSongIndex % (musicListNumbers - 1)

    if (data?.setCurrentSongId) {
      const currentSongId = musicList[currentSongIndex].id
      data.setCurrentSongId(currentSongId)
    }

    setAudioSrc(
      musicList[nextSongIndex],
      audioElement,
      isPlay,
      trackTitleElement,
      data?.endTimerElement,
      data?.timerElement,
    )
  }

  const previewTrackHandler = () => {
    let previewSognIndex = currentSongIndex - 1

    if (previewSognIndex < 0) previewSognIndex += musicListNumbers - 1

    currentSongIndex = previewSognIndex

    if (data?.setCurrentSongId) {
      const currentSongId = musicList[currentSongIndex].id
      data.setCurrentSongId(currentSongId)
    }

    setAudioSrc(
      musicList[previewSognIndex],
      audioElement,
      isPlay,
      trackTitleElement,
      data?.endTimerElement,
      data?.timerElement,
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
    audioElement.pause()

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

    if (data?.setCurrentSongId) {
      const currentSongId = musicList[currentSongIndex].id
      data.setCurrentSongId(currentSongId)
    }

    setAudioSrc(
      musicList[nextSongIndex],
      audioElement,
      isPlay,
      trackTitleElement,
      data?.endTimerElement,
      data?.timerElement,
    )
  }

  const timeupdateAudioHandler = (e: any) => {
    const audio = e.target
    const currentTime = audio.currentTime

    const minuteAudio = getMinuteAudio(currentTime)
    const secondAudio = getSecondAudio(currentTime)

    if (data.animateTrackElement) {
      data.animateTrackElement.style.width =
        Math.floor((currentTime / audio.duration) * 100) + '%'
    }

    if (data.thumbTimerElement) {
      data.thumbTimerElement.style.transform = `translateX(-${
        Math.floor((currentTime / audio.duration) * 100) + '%'
      })`
      data.thumbTimerElement.style.left =
        Math.floor((currentTime / audio.duration) * 100) + '%'
    }

    if (data.startTimerElement) {
      data.startTimerElement.innerText = `${minuteAudio}:${secondAudio}`
    }

    if (data.timerElement) {
      data.timerElement.value = currentTime
    }
  }

  const timeChangeHandler = (e: any) => {
    const currentTime = e.target.value

    audioElement.currentTime = currentTime
  }

  data?.playElement?.addEventListener('click', playPauseClickHandler)
  data?.nextTrackElement?.addEventListener('click', nextTrackHandler)
  data?.previewTrackElement?.addEventListener('click', previewTrackHandler)
  data?.repeatElement?.addEventListener('click', repeatClickHandler)
  data?.shuffleElement?.addEventListener('click', shuffleClickHandler)

  data?.timerElement?.addEventListener('change', timeChangeHandler)

  audioElement.addEventListener('timeupdate', timeupdateAudioHandler)

  audioElement.addEventListener('ended', endedAudioHandler)

  document.body.appendChild(audioElement)

  return [audioElement, currentSongIndex]
}

export default useAudio
