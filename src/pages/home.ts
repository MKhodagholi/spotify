import Album from '../class/Album'
import styles from './home.module.css'

interface IMusicAlbum {
  id: string
  label: string
  image: string
}

const HomePage = () => {
  const recentlyPlayedElement = document.createElement('div')

  const recentlyPlayedItems = []

  const album1 = new Album({
    name: 'Emotion',
    id: '114701',
    composer: 'Frozen Silence',
    genre: 'Classical Crossover',
    thumb:
      'https://vmusic.ir/wp-content/uploads/2022/02/Frozen-Silence-Emotion-2022-225x225.jpg',
    tracks: [],
  })

  const madeForYouElement = document.createElement('div')

  madeForYouElement.classList.add(styles.playlist)

  madeForYouElement.innerHTML = `<h3>Made For You</h3>`

  const albumsDiv = document.createElement('div')

  albumsDiv.classList.add(styles['albums-div'])

  const madeForYouItems = [
    album1.createElement(),
    album1.createElement(),
    album1.createElement(),
  ]

  madeForYouItems.forEach(item => albumsDiv.appendChild(item))

  madeForYouElement.appendChild(albumsDiv)

  return madeForYouElement
}

export default HomePage
