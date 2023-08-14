import ArtistItem, { IArtistItem } from './ArtistItem'

import styles from './ArtistList.module.css'

const ArtistList = (items: Array<IArtistItem>) => {
  const artistListElement = document.createElement('div')
  artistListElement.classList.add(styles['artist-list'])

  items.forEach(item => artistListElement.appendChild(ArtistItem(item)))

  return artistListElement
}

export default ArtistList
