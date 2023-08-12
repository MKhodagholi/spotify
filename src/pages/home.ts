import Album from '../class/Album'
import { getDataOfMadeForYou, getDataOfRecentlyPlayed } from '../lib/data'
import styles from './home.module.css'

const createMadeForYouElement = (albums: Array<Album>) => {
  const madeForYouElement = document.createElement('div')

  madeForYouElement.classList.add(styles.playlist, styles['big-images'])

  madeForYouElement.innerHTML = `<h3>Made For You</h3>`

  const albumsDiv = document.createElement('div')

  albumsDiv.classList.add(styles['albums-div'])

  albums.forEach(album => albumsDiv.appendChild(album.createElement()))

  madeForYouElement.appendChild(albumsDiv)

  return madeForYouElement
}

const createRecentlyPlayedElement = (albums: Array<Album>) => {
  // if user has not played any song, then show nothing!
  if (albums.length <= 0) return document.createElement('div')
  const recentlyPlayedElement = document.createElement('div')

  recentlyPlayedElement.classList.add(styles.playlist, styles['small-images'])

  recentlyPlayedElement.innerHTML = `<h3>Recently Played</h3>`

  const albumsDiv = document.createElement('div')

  albumsDiv.classList.add(styles['albums-div'])

  albums.forEach(album => albumsDiv.appendChild(album.createElement()))

  recentlyPlayedElement.appendChild(albumsDiv)

  return recentlyPlayedElement
}

const HomePage = () => {
  const madeForYouAlbumsData = getDataOfMadeForYou()
  const madeForYouElement = createMadeForYouElement(madeForYouAlbumsData)

  const recentlyPlayedData = getDataOfRecentlyPlayed()
  const recentlyPlayedElement = createRecentlyPlayedElement(recentlyPlayedData)

  return [recentlyPlayedElement, madeForYouElement]
}

export default HomePage
