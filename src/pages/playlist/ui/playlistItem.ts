import styles from './PlaylistItem.module.css'

import likeIcon from '../../../assets/icons/like-active_icon.svg'
import downloadActiveIcon from '../../../assets/icons/download-active_icon.svg'

export interface IPlaylistItem {
  image: string
  name: string
  composerName: string
  albumId: string
  songId: string
  url: string
}

const PlayListItem = (item: IPlaylistItem) => {
  const { name, image, composerName } = item

  const playlistItemElement = document.createElement('div')
  playlistItemElement.classList.add(styles['playlist-item'])
  const itemInfoElement = document.createElement('div')
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

  composerWithDownloadIconDivElement.appendChild(downloadElement)
  composerWithDownloadIconDivElement.appendChild(composerNameElement)

  nameWithComposernameElement.appendChild(nameElement)
  nameWithComposernameElement.appendChild(composerWithDownloadIconDivElement)

  itemInfoElement.appendChild(imageElement)
  itemInfoElement.appendChild(nameWithComposernameElement)

  const likeIconElement = document.createElement('img')
  likeIconElement.classList.add(styles['like-icon'])

  likeIconElement.src = likeIcon

  playlistItemElement.appendChild(itemInfoElement)

  playlistItemElement.appendChild(likeIconElement)

  return playlistItemElement
}

export default PlayListItem
