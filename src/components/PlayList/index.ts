import AlbumItem, { IPlayListItem } from './PlayListItem'

import styles from './PlayList.module.css'

const PlayList = (items: Array<IPlayListItem>) => {
  const playListElement = document.createElement('div')
  playListElement.classList.add(styles['album-list'])

  items.forEach(item => playListElement.appendChild(AlbumItem(item)))

  return playListElement
}

export default PlayList
