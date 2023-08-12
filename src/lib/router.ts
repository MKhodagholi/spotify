import AlbumPage from '../pages/album'
import HomePage from '../pages/home'
import NotFoundPage from '../pages/not-found'

// interface IRoute {
//   pathname: string
//   element: HTMLElement
//   children: Array<IRoute> | null
// }

// export const routes: Array<IRoute> = [
//   { pathname: '/', element: document.createElement('div'), children: null },
//   { pathname: '/album', element: document.createElement('div'), children: [] },
// ]

export const navigate = (to: string) => {
  window.history.pushState('', '', to)
  window.dispatchEvent(new Event('locationchange'))
}

export function Router(): Array<HTMLElement> {
  const path = window.location.pathname

  const isAlbumPage = path.split('/', 3)[1] === 'album'

  let nodeArrays

  if (path === '/') {
    nodeArrays = HomePage()
  } else if (isAlbumPage) {
    const albumId = path.split('/', 3)[2]
    nodeArrays = AlbumPage(albumId)
  } else {
    nodeArrays = NotFoundPage()
  }

  if (nodeArrays instanceof HTMLElement) return [nodeArrays]
  else return nodeArrays
}
