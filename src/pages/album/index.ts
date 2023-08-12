import { getAlbumDataWithId } from '../../lib/data'
import styles from './album.module.css'

import likeIcon from '../../assets/icons/like_icon.svg'
import likeActiveIcon from '../../assets/icons/like-active_icon.svg'
import downloadIcon from '../../assets/icons/download_icon.svg'
import playIcon from '../../assets/icons/play_icon.svg'
import shuffleIcon from '../../assets/icons/shuffle_icon.svg'
import MusicList, { TrackItem } from '../../components/MusicList'
import { Track } from '../../class/Album'
import audio from '../../lib/audio'

/* 
<div className=${styles['album-like-download']}>
  <img src=${likeIcon} />
  <img src=${downloadIcon} />
</div>
*/

const getDownloadLikeDivElement = (
  onLike: () => void,
  onDownload: () => void,
  likeActive: boolean,
) => {
  const likeDowloadDivElement = document.createElement('div')
  likeDowloadDivElement.classList.add(styles['album-like-download'])

  const likeIconElement = document.createElement('img')
  likeIconElement.classList.add(styles['like-icon'])
  likeIconElement.setAttribute('src', likeActive ? likeActiveIcon : likeIcon)
  likeIconElement.addEventListener('click', onLike)

  const dowloadIconElement = document.createElement('img')
  dowloadIconElement.setAttribute('src', downloadIcon)
  dowloadIconElement.addEventListener('click', onDownload)

  likeDowloadDivElement.appendChild(likeIconElement)
  likeDowloadDivElement.appendChild(dowloadIconElement)

  return likeDowloadDivElement
}

/* 
<div class=${styles['play-icon-div']}>
  <img src=${playIcon} />
  <div class=${styles['shuffle-icon-div']}>
    <img src=${shuffleIcon} />
  </div>
</div>
*/
const getPlayDivElement = (onPlay: () => void, onShuffle: () => void) => {
  const playIconDivElement = document.createElement('div')
  playIconDivElement.classList.add(styles['play-icon-div'])

  const playIconElement = document.createElement('img')
  playIconElement.setAttribute('src', playIcon)
  playIconElement.addEventListener('click', () => {})

  playIconDivElement.appendChild(playIconElement)

  const suffleIconDivElement = document.createElement('div')
  suffleIconDivElement.classList.add(styles['shuffle-icon-div'])

  const suffleIconElement = document.createElement('img')
  suffleIconElement.setAttribute('src', shuffleIcon)
  suffleIconElement.addEventListener('click', onShuffle)

  suffleIconDivElement.appendChild(suffleIconElement)

  playIconDivElement.appendChild(suffleIconDivElement)

  return playIconDivElement
}

const AlbumPage = (albumId: string) => {
  const albumData = getAlbumDataWithId(albumId)

  const { album, musics } = albumData

  const albumPageElement = document.createElement('div')

  const albumPublishYear = 2018 + (+album.id % 5)

  let isPlay = false
  let isShuffleMode = false

  const songList = musics.map(item => item.track_url)

  const downloadIconClickHandler = () => {}
  const likeIconClickHandler = () => {}
  const playClickHandler = () => {
    console.log('its clicked')
    isPlay = !isPlay
    audioElement.play()
  }
  const shuffleClickHandler = () => {
    isShuffleMode = !isShuffleMode
    console.log('hello')
  }

  const audioElement = audio(songList, isPlay, isShuffleMode)

  albumPageElement.innerHTML = `<div class=${styles['album-page-content']}>
  <div class=${styles['thumb-img']}>
  <img src=${album.album_thumb} alt="" />
  </div>
  <div class=${styles['album-info']}>
    <p>${album.album_name}</p>
    <div class=${styles.artist}>
      <div class=${styles['artist-placeholder']}><img src=${album.album_thumb} alt="" /></div>
      <span>${album.album_composer}</span>
    </div>
  </div>
</div>`

  const albumActionsWithDateElement = document.createElement('div')
  albumActionsWithDateElement.innerHTML = `<p class=${styles['album-date']}>Album . ${albumPublishYear}</p>`

  const albumActionsDivElement = document.createElement('div')
  albumActionsDivElement.classList.add(styles['album-actions-div'])

  const downloadLikeElement = getDownloadLikeDivElement(
    downloadIconClickHandler,
    likeIconClickHandler,
    true,
  )

  albumActionsDivElement.appendChild(downloadLikeElement)

  const playIconDivElement = getPlayDivElement(
    playClickHandler,
    shuffleClickHandler,
  )

  albumActionsDivElement.appendChild(playIconDivElement)

  albumActionsWithDateElement.appendChild(albumActionsDivElement)

  albumPageElement.appendChild(albumActionsWithDateElement)

  const musicListElement = document.createElement('div')

  musicListElement.classList.add(styles['music-list'])

  const musicArray: Array<Track> = musics.map(item => ({
    id: String(item.id),
    name: item.track_name,
    time: item.track_time,
    url: item.track_url,
    thumb: item.track_thumb,
    composerName: album.album_composer,
  }))

  const musicList = MusicList(musicArray)

  musicList.forEach(item => musicListElement.appendChild(item))

  albumPageElement.appendChild(musicListElement)

  return albumPageElement
}

export default AlbumPage
