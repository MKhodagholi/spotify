import styles from './artist.module.css'

import { getPlayDivElement } from '../album'
import useAudio, { AudioMusicList } from '../../hooks/useAudio'

import imagePlaceholder from '../../assets/images/artist-placeholder_image.png'
import playIcon from '../../assets/icons/play_icon.svg'
import pauseIcon from '../../assets/icons/pause-white_icon.svg'
import { getSongDataWithArtistName } from '../../lib/data'
import Link from '../../components/Link'

const createArtistSongElement = (
  name: string,
  image: string,
  downloadNumber: number,
  index: number,
  albumId: string,
  songId: string,
) => {
  let songItemElement = document.createElement('div')
  songItemElement.classList.add(styles['song-item'])

  songItemElement.innerHTML = `<span>${index}</span><img src=${image} /><div><p>${name}</p><span>${downloadNumber}</span></div>`

  songItemElement = Link(songItemElement, `/album/${albumId}/${songId}`)

  return songItemElement
}

const ArtistPage = (artistName: string) => {
  const validName = artistName.split('_').join(' ')

  const artistSongs = getSongDataWithArtistName(validName)

  const musicList: Array<AudioMusicList> = artistSongs.map(song => ({
    id: String(song.id),
    url: song.track_url,
    name: song.track_name,
  }))

  const artistPageElement = document.createElement('div')
  artistPageElement.classList.add(styles['artist-page'])

  const imageArtistDivElement = document.createElement('div')
  imageArtistDivElement.classList.add(styles['image-artist-div'])

  imageArtistDivElement.innerHTML = `<div class=${styles['image-overlay']}></div><img src=${imagePlaceholder} /><h2>${validName}</h2>`

  const playDivElement = document.createElement('div')
  playDivElement.classList.add(styles['play-div'])

  const [playElement, playIconElement, shuffleElement] = getPlayDivElement()

  const playClickHandler = (isPlay: boolean) => {
    if (isPlay) playIconElement.src = pauseIcon
    else playIconElement.src = playIcon
  }

  if (musicList.length > 0)
    useAudio({
      musicList,
      playElement,
      onPlay: playClickHandler,
      shuffleElement,
    })

  playDivElement.appendChild(playElement)

  const listMusicDivElement = document.createElement('div')
  listMusicDivElement.classList.add(styles['list-music-div'])

  listMusicDivElement.innerHTML = `<h3>Popular</h3>`

  const listMusicElement = document.createElement('div')
  listMusicElement.classList.add(styles['song-list'])

  artistSongs.forEach((song, index) =>
    listMusicElement.appendChild(
      createArtistSongElement(
        song.track_name,
        song.track_thumb,
        Math.floor(Math.random() * 100000),
        index + 1,
        song.albumId,
        String(song.id),
      ),
    ),
  )

  listMusicDivElement.appendChild(listMusicElement)

  artistPageElement.appendChild(imageArtistDivElement)

  artistPageElement.appendChild(playDivElement)

  artistPageElement.appendChild(listMusicDivElement)

  return artistPageElement
}

export default ArtistPage
