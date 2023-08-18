import styles from './search.module.css'

import searchIcon from '../../assets/icons/search_icon.svg'
import SearchService, { Song } from '../../lib/search'
import { IArtistItem } from '../../components/ArtistList/ArtistItem'
import { IAlbumItem } from '../../components/AlbumList/AlbumItem'
import Link from '../../components/Link'

const createSongElement = (songObj: Song) => {
  let songElmenet = document.createElement('div')
  songElmenet.classList.add(styles['result-item'])
  songElmenet.innerHTML = `<img src=${songObj.thumb} /><div><p>${songObj.name}</p><span>Song . ${songObj.composerName}</span></div>`

  songElmenet = Link(songElmenet, `/album/${songObj.albumId}/${songObj.id}`)

  return songElmenet
}

const createArtistElement = (artistObj: IArtistItem) => {
  let artistElmenet = document.createElement('div')
  artistElmenet.classList.add(styles['result-item'])
  artistElmenet.innerHTML = `<img src=${artistObj.image} /><div><p>${artistObj.name}</p><span>Artist</span></div>`

  const validName = artistObj.name.split(' ').join('_')

  artistElmenet = Link(artistElmenet, `/artist/${validName}`)

  return artistElmenet
}

const createAlbumElement = (albumObj: IAlbumItem) => {
  let albumElement = document.createElement('div')
  albumElement.classList.add(styles['result-item'])
  albumElement.innerHTML = `<img src=${albumObj.thumb} /><div><p>${albumObj.name}</p><span>Album . ${albumObj.composerName}</span></div>`

  albumElement = Link(albumElement, `/album/${albumObj.albumId}`)

  return albumElement
}

const SearchPage = () => {
  const searchPageElement = document.createElement('div')

  const titleElement = document.createElement('p')
  titleElement.classList.add(styles.title)
  titleElement.innerText = 'Search Page'

  searchPageElement.classList.add(styles['search-page'])

  const searchElement = document.createElement('div')
  searchElement.classList.add(styles['search-div'])

  const serachImageElement = document.createElement('img')
  serachImageElement.src = searchIcon
  const searchInputElement: HTMLInputElement = document.createElement('input')

  searchInputElement.placeholder = 'Search'

  const searchResultElement = document.createElement('div')
  searchResultElement.classList.add(styles['result-div'])

  const searchHandler = (e: any) => {
    searchResultElement.innerHTML = ''
    const value = e.target.value as string

    if (value.trim().length <= 0) return

    const findArtist = SearchService.artist(value)
    const findAlbums = SearchService.album(value)
    const findSongs = SearchService.song(value)

    findArtist
      .map(artist => createArtistElement(artist))
      .forEach(artistElement => searchResultElement.appendChild(artistElement))

    findAlbums
      .map(album => createAlbumElement(album))
      .forEach(albumElement => searchResultElement.appendChild(albumElement))

    findSongs
      .map(song => createSongElement(song))
      .forEach(songElement => searchResultElement.appendChild(songElement))
  }

  searchInputElement.addEventListener('input', searchHandler)

  searchPageElement.appendChild(titleElement)
  searchElement.appendChild(serachImageElement)
  searchElement.appendChild(searchInputElement)

  searchPageElement.appendChild(searchElement)

  searchPageElement.appendChild(searchResultElement)

  return searchPageElement
}

export default SearchPage
