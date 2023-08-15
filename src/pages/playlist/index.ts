// import { getPlaylistItemWithName } from '../../lib/indexDB'
import styles from './playlist.module.css'
import PlayListItem, { IPlaylistItem } from './ui/playlistItem'

const PlaylistPage = (name: string) => {
  const playlistPageElement = document.createElement('div')
  playlistPageElement.classList.add(styles['playlist-page'])

  playlistPageElement.innerHTML = `
    <div class=${styles['light-blob']}></div>
    <div class=${styles['playlist-info']}><h2>${name}</h2>
    <button>SHUFFLE PLAY</button></div>
  `

  // const playlistItems = getPlaylistItemWithName(name)
  const playlistItems: Array<IPlaylistItem> = [
    {
      name: 'By the Sea',
      songId: '114760',
      url: 'https://dl.vmusic.ir/2022/02/Frozen Silence - Emotion (2022)/128k/01) Frozen Silence - By the Sea.mp3',
      albumId: '24',
      image:
        'https://vmusic.ir/wp-content/uploads/2022/02/Frozen-Silence-Emotion-2022-225x225.jpg',
      composerName: 'adsfsd',
    },
  ]

  const plaulistListElement = document.createElement('div')
  plaulistListElement.classList.add(styles['playlist-list'])

  playlistItems.forEach(item =>
    plaulistListElement.appendChild(PlayListItem(item)),
  )

  playlistPageElement.appendChild(plaulistListElement)

  return playlistPageElement
}

export default PlaylistPage
