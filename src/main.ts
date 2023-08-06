import './global.css'

import Menu from './components/Menu'

const appDivElement: HTMLDivElement = document.querySelector('#app')!

function renderDom(root: HTMLDivElement) {
  let jsx: HTMLElement = Menu()

  root.append(jsx)
}

renderDom(appDivElement)
