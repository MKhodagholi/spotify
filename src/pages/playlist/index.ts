import styles from './playlist.module.css'
import PlayListItem, {
  IPlaylistAlbumItem,
  IPlaylistItem,
} from './ui/playlistItem'

import { LikeService } from '../../lib/indexDB'

const PlaylistPage = async (name: string) => {
  const playlistPageElement = document.createElement('div')
  playlistPageElement.classList.add(styles['playlist-page'])

  playlistPageElement.innerHTML = `
    <div class=${styles['light-blob']}></div>
    <div class=${styles['playlist-info']}><h2>${name}</h2>
    <button>SHUFFLE PLAY</button></div>
  `

  const likesItems = await LikeService.getLikesitems()

  const playlistItems: Array<IPlaylistItem | IPlaylistAlbumItem> =
    likesItems.map(item => {
      if ('url' in item) {
        return {
          image: item.image,
          name: item.name,
          composerName: item.composerName,
          albumId: item.albumId,
          id: item.id,
          url: item.url,
        }
      } else {
        return {
          image: item.image,
          name: item.name,
          composerName: item.composerName,
          id: item.id,
        }
      }
    })

  const plaulistListElement = document.createElement('div')
  plaulistListElement.classList.add(styles['playlist-list'])

  playlistItems.forEach(item =>
    plaulistListElement.appendChild(PlayListItem(item)),
  )

  playlistPageElement.appendChild(plaulistListElement)

  return playlistPageElement
}

export default PlaylistPage
