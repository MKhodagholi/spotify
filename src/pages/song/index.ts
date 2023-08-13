import { getAlbumDataWithId, getSongDataWithId } from '../../lib/data'

import styles from './song.module.css'

import useAudio from '../../hooks/useAudio'

import likeIcon from '../../assets/icons/like_icon.svg'

import previewSongIcon from '../../assets/icons/preview-song_icon.svg'
import pauseIcon from '../../assets/icons/pause-black_icon.svg'
import playIcon from '../../assets/icons/play-black_icon.svg'
import repeatIcon from '../../assets/icons/repeat-song_icon.svg'
import repeatActiveIcon from '../../assets/icons/repeat-active_icon.svg'
import shuffleIcon from '../../assets/icons/shuffle-big_icon.svg'
import shuffleActiveIcon from '../../assets/icons/shuffle-big-active_icon.svg'

const SongPage = (albumId: string, songId: string) => {
  const song = getSongDataWithId(albumId, songId)
  const { musics } = getAlbumDataWithId(albumId)
  const songList = musics.map(item => ({
    id: String(item.id),
    url: item.track_url,
    name: item.track_name,
  }))

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
  likeSongElement.src = likeIcon

  songInfoElement.appendChild(likeSongElement)

  songPageElement.appendChild(songInfoElement)

  const inputRangeElement = document.createElement('input')
  inputRangeElement.classList.add(styles['input-range'])
  inputRangeElement.type = 'range'

  songPageElement.appendChild(inputRangeElement)

  const songTimeDivElement = document.createElement('div')
  songTimeDivElement.classList.add(styles['song-time-div'])
  songTimeDivElement.innerHTML = `<span>${'0.00'}</span><span>${
    song.track_time
  }</span>`

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
    trackTitleElement: songNameElement,
    playElement: pauseSongDivElement,
    shuffleElement,
    nextTrackElement: nextSongElement,
    previewTrackElement: previewSongElement,
    repeatElement: repeatSongElement,
    onPlay: playClickHandler,
    onShuffle: shuffleClickHandler,
    onRepeat: repeatClickHandler,
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
