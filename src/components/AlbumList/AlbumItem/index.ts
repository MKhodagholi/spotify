import styles from './AlbumItem.module.css'

import Link from '../../Link'

export interface IAlbumItem {
  albumId: string
  name: string
  composerName: string
  thumb: string
}

const AlbumItem = (item: IAlbumItem) => {
  const { name, composerName, thumb, albumId } = item
  let albumElement = document.createElement('div')
  albumElement.classList.add(styles['album-item'])

  albumElement.innerHTML = `<img src=${thumb} /><div class=${styles['album-info']}><p>${name}</p><span>${composerName}</span></div>`

  albumElement = Link(albumElement, `/album/${albumId}`)

  return albumElement
}

export default AlbumItem
