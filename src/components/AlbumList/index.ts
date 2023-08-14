import AlbumItem, { IAlbumItem } from './AlbumItem'

import styles from './AlbumList.module.css'

const AlbumList = (items: Array<IAlbumItem>) => {
  const albumListElement = document.createElement('div')
  albumListElement.classList.add(styles['album-list'])

  items.forEach(item => albumListElement.appendChild(AlbumItem(item)))

  return albumListElement
}

export default AlbumList
