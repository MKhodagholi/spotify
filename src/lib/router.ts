import AlbumPage from '../pages/album'
import HomePage from '../pages/home'
import NotFoundPage from '../pages/not-found'
import SongPage from '../pages/song'
import { removeAllAudio } from '../lib/removeAllAudio'
import LibraryPage from '../pages/library'
import ArtistPage from '../pages/artist'
import PlaylistPage from '../pages/playlist'

const pageElement: HTMLDivElement = document.querySelector('#page')!

const menuElement = document.getElementById('menu')!

export const navigate = (to: string) => {
  window.history.pushState('', '', to)
  window.dispatchEvent(new Event('locationchange'))
}

export async function Router(): Promise<Array<HTMLElement>> {
  const path = window.location.pathname

  const pathArray = path.split('/', 4)

  const isAlbumPage = pathArray.length === 3 && pathArray[1] === 'album'
  const isSongPage = pathArray.length === 4 && pathArray[1] === 'album'

  const isArtistPage = pathArray.length === 3 && pathArray[1] === 'artist'

  const isPlaylistPage = pathArray.length === 3 && pathArray[1] === 'playlist'

  const hideMenuHandlder = () => {
    pageElement.classList.add('full')
    menuElement.innerHTML = ''
    menuElement.classList.remove('menu')
  }

  removeAllAudio()

  let nodeArrays

  menuElement.classList.add('menu')
  pageElement.classList.remove('full')

  if (path === '/') {
    nodeArrays = HomePage()
  } else if (path === '/library') {
    nodeArrays = LibraryPage()
  } else if (isAlbumPage) {
    const albumId = pathArray[2]
    nodeArrays = await AlbumPage(albumId)
    hideMenuHandlder()
  } else if (isSongPage) {
    hideMenuHandlder()
    const albumId = pathArray[2]
    const songId = pathArray[3]
    nodeArrays = await SongPage(albumId, songId)
  } else if (isArtistPage) {
    hideMenuHandlder()
    const artistName = pathArray[2]
    nodeArrays = ArtistPage(artistName)
  } else if (isPlaylistPage) {
    hideMenuHandlder()
    const playlistName = pathArray[2].split('_').join(' ')
    nodeArrays = await PlaylistPage(playlistName)
  } else {
    nodeArrays = NotFoundPage()
  }

  if (nodeArrays instanceof HTMLElement) return [nodeArrays]
  else return nodeArrays as HTMLElement[]
}
