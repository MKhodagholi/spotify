import { getAlbumDataWithId, getSongDataWithId } from '../../lib/data'

import styles from './song.module.css'

import useAudio from '../../hooks/useAudio'

import likeIcon from '../../assets/icons/like_icon.svg'
import likeActiveIcon from '../../assets/icons/like-active_icon.svg'

import previewSongIcon from '../../assets/icons/preview-song_icon.svg'
import pauseIcon from '../../assets/icons/pause-black_icon.svg'
import playIcon from '../../assets/icons/play-black_icon.svg'
import repeatIcon from '../../assets/icons/repeat-song_icon.svg'
import repeatActiveIcon from '../../assets/icons/repeat-active_icon.svg'
import shuffleIcon from '../../assets/icons/shuffle-big_icon.svg'
import shuffleActiveIcon from '../../assets/icons/shuffle-big-active_icon.svg'
import { LikeService } from '../../lib/indexDB'

const SongPage = async (albumId: string, songId: string) => {
  const song = getSongDataWithId(albumId, songId)
  const { musics, album } = getAlbumDataWithId(albumId)

  const songList = musics.map(item => ({
    id: String(item.id),
    albumId,
    url: item.track_url,
    name: item.track_name,
  }))

  let currentSongId = songId

  let isLike: boolean = !!(await LikeService.getDataLikeItem(currentSongId))

  const setCurrentSongId = async (songId: string) => {
    currentSongId = songId

    isLike = !!(await LikeService.getDataLikeItem(currentSongId))

    if (isLike) {
      likeSongElement.src = likeActiveIcon
    } else {
      likeSongElement.src = likeIcon
    }
  }

  const likeClickHandler = async () => {
    console.log(isLike)
    if (isLike) {
      await LikeService.removeLikesItem(songId)
      likeSongElement.src = likeIcon
    } else {
      const songItem = musics.find(music => +music.id === +currentSongId)!
      await LikeService.saveLikeDataInIndexDB({
        id: currentSongId,
        albumId,
        url: songItem.track_url,
        image: songItem.track_thumb,
        name: songItem.track_name,
        composerName: album.album_composer,
      })

      likeSongElement.src = likeActiveIcon
    }

    isLike = !isLike
  }

  const songIndex = songList.findIndex(song => song.id === songId)

  const songPageElement = document.createElement('div')
  songPageElement.classList.add(styles['song-page'])

  const imgThumbElement = document.createElement('img')
  imgThumbElement.src = song.track_thumb
  imgThumbElement.classList.add(styles.thumb)

  songPageElement.appendChild(imgThumbElement)

  const songInfoElement = document.createElement('div')
  songInfoElement.classList.add(styles['song-info-div'])

  const songNameElement = document.createElement('div')
  songNameElement.innerHTML = `<p>${song.track_name}</p><span>${song.componserName}</span>`

  songInfoElement.appendChild(songNameElement)

  const likeSongElement = document.createElement('img')

  if (isLike) {
    likeSongElement.src = likeActiveIcon
  } else {
    likeSongElement.src = likeIcon
  }

  likeSongElement.style.cursor = 'pointer'

  likeSongElement.addEventListener('click', likeClickHandler)

  songInfoElement.appendChild(likeSongElement)

  songPageElement.appendChild(songInfoElement)

  const trackElement = document.createElement('div')
  trackElement.classList.add(styles.track)
  const timerElement = document.createElement('input')
  timerElement.classList.add(styles['input-range'])
  timerElement.value = '0'
  timerElement.type = 'range'
  timerElement.step = '1'

  const thumbTimerElement = document.createElement('div')
  thumbTimerElement.classList.add(styles['timer-thumb'])

  const animateTrackElement = document.createElement('div')
  animateTrackElement.classList.add(styles['animate-track'])

  trackElement.appendChild(timerElement)
  trackElement.appendChild(thumbTimerElement)
  trackElement.appendChild(animateTrackElement)

  songPageElement.appendChild(trackElement)

  const songTimeDivElement = document.createElement('div')
  songTimeDivElement.classList.add(styles['song-time-div'])

  const songTimeStartElement = document.createElement('span')
  songTimeStartElement.textContent = '00:00'
  const songTimeEndElemenet = document.createElement('span')
  songTimeEndElemenet.textContent = song.track_time

  songTimeDivElement.appendChild(songTimeStartElement)
  songTimeDivElement.appendChild(songTimeEndElemenet)

  songPageElement.appendChild(songTimeDivElement)

  const songControllerElement = document.createElement('div')
  songControllerElement.classList.add(styles['song-controller'])

  const shuffleElement = document.createElement('img')
  shuffleElement.src = shuffleIcon

  const previewSongElement = document.createElement('img')
  previewSongElement.src = previewSongIcon

  const pauseSongDivElement = document.createElement('div')
  pauseSongDivElement.classList.add(styles['pause-div'])
  const playPauseSongElement = document.createElement('img')
  playPauseSongElement.src = playIcon
  pauseSongDivElement.appendChild(playPauseSongElement)

  const nextSongElement = document.createElement('img')
  nextSongElement.style.transform = 'rotate(180deg)'
  nextSongElement.src = previewSongIcon

  const repeatSongElement = document.createElement('img')
  repeatSongElement.src = repeatIcon

  const playClickHandler = (isPlay: boolean) => {
    if (isPlay) playPauseSongElement.src = pauseIcon
    else playPauseSongElement.src = playIcon
  }

  const shuffleClickHandler = (isShuffle: boolean) => {
    if (isShuffle) shuffleElement.src = shuffleIcon
    else shuffleElement.src = shuffleActiveIcon
  }

  const repeatClickHandler = (isRepeat: boolean) => {
    if (isRepeat) repeatSongElement.src = repeatIcon
    else repeatSongElement.src = repeatActiveIcon
  }

  useAudio({
    musicList: songList,
    startFrom: songIndex,
    setCurrentSongId,
    trackTitleElement: songNameElement,
    playElement: pauseSongDivElement,
    shuffleElement,
    nextTrackElement: nextSongElement,
    previewTrackElement: previewSongElement,
    repeatElement: repeatSongElement,
    onPlay: playClickHandler,
    onShuffle: shuffleClickHandler,
    onRepeat: repeatClickHandler,
    timerElement,
    startTimerElement: songTimeStartElement,
    endTimerElement: songTimeEndElemenet,
    animateTrackElement,
    thumbTimerElement,
  })

  songControllerElement.appendChild(shuffleElement)
  songControllerElement.appendChild(previewSongElement)
  songControllerElement.appendChild(pauseSongDivElement)
  songControllerElement.appendChild(nextSongElement)
  songControllerElement.appendChild(repeatSongElement)

  songPageElement.appendChild(songControllerElement)

  return songPageElement
}

export default SongPage
