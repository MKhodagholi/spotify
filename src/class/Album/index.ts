import Link from '../../components/Link'
import styles from './Album.module.css'

export interface Track {
  id: string
  albumId: string
  name: string
  time: string
  url: string
  thumb: string
  composerName: string
}

interface IAlbum {
  id: string
  name: string
  composer: string
  genre: string
  thumb: string
  tracks: Array<Track>
}

class Album implements IAlbum {
  name: string
  id: string
  composer: string
  genre: string
  thumb: string
  tracks: Track[]

  constructor(data: IAlbum) {
    const { name, id, composer, genre, thumb, tracks } = data
    this.name = name
    this.id = id
    this.composer = composer
    this.genre = genre
    this.thumb = thumb
    this.tracks = tracks
  }

  createElement() {
    const { name, thumb } = this

    let element = document.createElement('div')

    element.classList.add(styles.album)

    element.innerHTML = `<img src=${thumb} /><span>${name}</span>`

    element = Link(element, `/album/${this.id}`)

    return element
  }
}

export default Album
