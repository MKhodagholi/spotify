import styles from './PlaylistItem.module.css'

import downloadActiveIcon from '../../../assets/icons/download-active_icon.svg'

import activeLikeIcon from '../../../assets/icons/like-active_icon.svg'
import likeIcon from '../../../assets/icons/like_icon.svg'
import { DownloadService, LikeService } from '../../../lib/indexDB'
import Link from '../../../components/Link'

export interface IPlaylistItem {
  image: string
  name: string
  composerName: string
  albumId: string
  id: string
  url: string
}

export interface IPlaylistAlbumItem {
  image: string
  name: string
  composerName: string
  id: string
}

const PlayListItem = (item: IPlaylistItem | IPlaylistAlbumItem) => {
  const { name, image, composerName } = item

  const playlistItemElement = document.createElement('div')
  playlistItemElement.classList.add(styles['playlist-item'])
  let itemInfoElement = document.createElement('div')
  itemInfoElement.classList.add(styles['item-info'])

  const imageElement = document.createElement('img')
  imageElement.src = image
  imageElement.classList.add(styles['thumb'])

  const nameWithComposernameElement = document.createElement('div')
  nameWithComposernameElement.classList.add(styles['name-with-composer'])
  const nameElement = document.createElement('p')
  nameElement.innerText = name

  const composerWithDownloadIconDivElement = document.createElement('div')
  composerWithDownloadIconDivElement.classList.add(
    styles['composer-download-div'],
  )

  const composerNameElement = document.createElement('span')
  composerNameElement.innerText = composerName
  const downloadElement = document.createElement('img')
  downloadElement.src = downloadActiveIcon
  downloadElement.classList.add(styles['download-icon'])

  const downloadClickHandler = async (e: Event) => {
    e.stopPropagation()
    let data: Blob

    data = await DownloadService.getDataDownloadItem(item.id)

    const dataMp3 = data.slice(0, data.size, 'audio/mpeg')

    const linkElement = document.createElement('a')

    linkElement.download = item.name

    const link = URL.createObjectURL(dataMp3)

    linkElement.href = link

    linkElement.click()
  }

  downloadElement.addEventListener('click', downloadClickHandler)

  composerWithDownloadIconDivElement.appendChild(downloadElement)
  composerWithDownloadIconDivElement.appendChild(composerNameElement)

  nameWithComposernameElement.appendChild(nameElement)
  nameWithComposernameElement.appendChild(composerWithDownloadIconDivElement)

  itemInfoElement.appendChild(imageElement)
  itemInfoElement.appendChild(nameWithComposernameElement)

  const likeIconElement = document.createElement('img')
  likeIconElement.classList.add(styles['like-icon'])

  let isLiked = true

  likeIconElement.src = activeLikeIcon

  const likeClickHandler = async () => {
    if (isLiked) {
      likeIconElement.src = likeIcon

      await LikeService.removeLikesItem(item.id)
    } else {
      if ('url' in item) {
        const songItem = item as IPlaylistItem
        await LikeService.saveLikeDataInIndexDB(songItem)
      } else {
        likeIconElement.src = activeLikeIcon

        const albumItem = item as IPlaylistAlbumItem
        await LikeService.saveLikeDataInIndexDB(albumItem)
      }
    }

    isLiked = !isLiked
  }

  likeIconElement.addEventListener('click', likeClickHandler)

  if ('url' in item) {
    itemInfoElement = Link(itemInfoElement, `/album/${item.albumId}/${item.id}`)
  } else {
    nameElement.innerHTML += '(Album)'

    itemInfoElement = Link(itemInfoElement, `/album/${item.id}`)
  }

  playlistItemElement.appendChild(itemInfoElement)

  playlistItemElement.appendChild(likeIconElement)

  return playlistItemElement
}

export default PlayListItem
