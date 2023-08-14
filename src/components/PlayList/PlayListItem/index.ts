import styles from './PlayListItem.module.css'

import Link from '../../Link'

export interface IPlayListItem {
  image: string
  name: string
  link: string
}

const PlayListItem = (item: IPlayListItem) => {
  const { name, image, link } = item
  let albumElement = document.createElement('div')
  albumElement.classList.add(styles['playlist-item'])

  albumElement.innerHTML = `<img src=${image} /><div class=${styles['album-info']}><p>${name}</p></div>`

  albumElement = Link(albumElement, `/playlist/${link}`)

  return albumElement
}

export default PlayListItem
