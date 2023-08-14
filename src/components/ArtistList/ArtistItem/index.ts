import styles from './ArtistItem.module.css'

import artistPlaceholderImage from '../../../assets/images/artist-placeholder_image.svg'
import Link from '../../Link'

export interface IArtistItem {
  name: string
}

const ArtistItem = (item: IArtistItem) => {
  const { name } = item
  let artistElement = document.createElement('div')
  artistElement.classList.add(styles['artist-item'])

  artistElement.innerHTML = `<img src=${artistPlaceholderImage} /><p>${name}</p>`

  artistElement = Link(artistElement, `/artists/${name}`)

  return artistElement
}

export default ArtistItem
