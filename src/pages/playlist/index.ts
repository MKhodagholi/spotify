import styles from './playlist.module.css'
import PlayListItem, {
  IPlaylistAlbumItem,
  IPlaylistItem,
} from './ui/playlistItem'

import { LikeService } from '../../lib/indexDB'
import useAudio, { AudioMusicList } from '../../hooks/useAudio'
import { getAlbumDataWithId } from '../../lib/data'

const PlaylistPage = async (name: string) => {
  const playlistPageElement = document.createElement('div')
  playlistPageElement.classList.add(styles['playlist-page'])

  playlistPageElement.innerHTML = `
    <div class=${styles['light-blob']}></div>
    <div class=>
    </div>
  `

  const playListInfo = document.createElement('div')
  playListInfo.classList.add(styles['playlist-info'])

  playListInfo.innerHTML = `<h2>${name}</h2>`

  const shufflePlayElement = document.createElement('button')

  shufflePlayElement.innerText = 'SHUFFLE PLAY'

  playListInfo.appendChild(shufflePlayElement)

  playlistPageElement.appendChild(playListInfo)

  const likesItems = await LikeService.getLikesitems()

  let musicList: Array<AudioMusicList> = []

  likesItems.forEach(item => {
    if ('url' in item) {
      musicList.push(item)
    } else {
      const validItem = getAlbumDataWithId(item.id)
      const items: Array<AudioMusicList> = []
      validItem.musics.forEach(item => {
        items.push({
          id: String(item.id),
          name: item.track_name,
          albumId: validItem.album.id,
          url: item.track_url,
        })
      })
      musicList.push(...items)
    }
  })

  useAudio({
    musicList,
    playElement: shufflePlayElement,
  })

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
