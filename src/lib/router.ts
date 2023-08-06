// function renderPage(page: HTMLDivElement) {
//   const pageElement: HTMLDivElement = document.querySelector('#page')!

//   pageElement.innerHTML = ''
//   pageElement.append(page)
// }

interface IRoute {
  pathname: string
  element: HTMLElement
  children: Array<IRoute> | null
}

export const routes: Array<IRoute> = [
  { pathname: '/', element: document.createElement('div'), children: null },
  { pathname: '/album', element: document.createElement('div'), children: [] },
]

function route(to: string) {
  window.history.pushState('', '', to)
}

function router() {
  const path = window.location.pathname
}
