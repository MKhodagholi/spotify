import styles from './ArtistItem.module.css'

import Link from '../../Link'

export interface IArtistItem {
  name: string
  image: string
}

const ArtistItem = (item: IArtistItem) => {
  const { name, image } = item

  let artistElement = document.createElement('div')
  artistElement.classList.add(styles['artist-item'])

  artistElement.innerHTML = `<img src=${image} /><p>${name}</p>`

  const validName = name.split(' ').join('_')

  artistElement = Link(artistElement, `/artist/${validName}`)

  return artistElement
}

export default ArtistItem
