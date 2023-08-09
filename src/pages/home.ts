import Album, { Track } from '../class/Album'
import styles from './home.module.css'
import data from '../data/data.json'

const getValidData = () => {
  return data.filter(item => !!item.album.album_name)
}

const getDataOfMadeForYou = () => {
  const validData = getValidData()

  const albums: Array<Album> = validData.map(albumObj => {
    const { id, album_name, album_composer, album_genre, album_thumb } =
      albumObj.album

    const tracks: Array<Track> = albumObj.musics.map(music => {
      const { id, track_name, track_thumb, track_time, track_url } = music
      const track: Track = {
        id: String(id),
        name: track_name,
        thumb: track_thumb,
        time: track_time,
        url: track_url,
      }
      return track
    })

    const album = new Album({
      id: String(id),
      name: album_name,
      composer: album_composer,
      genre: album_genre,
      thumb: album_thumb,
      tracks,
    })

    return album
  })

  return albums
}

const getDataOfRecentlyPlayed = () => {
  const data: [] = []

  return data
}

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
