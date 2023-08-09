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

function route(to: string) {
  window.history.pushState('', '', to)
}

export function Router(): Array<HTMLElement> {
  const path = window.location.pathname

  // console.log(path)

  let nodeArrays

  console.log(path)

  if (path === '/') {
    nodeArrays = HomePage()
  } else {
    nodeArrays = NotFoundPage()
  }

  if (nodeArrays instanceof HTMLElement) return [nodeArrays]
  else return nodeArrays
}
