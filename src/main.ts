import './global.css'
import Menu from './components/Menu'
import { Router } from './lib/router'
import { initialSongObjInIndexDB } from './lib/indexDB'

const pageElement: HTMLDivElement = document.querySelector('#page')!

const renderPage = () => {
  pageElement.innerHTML = ''
  Menu()
  const nodePages = Router()

  nodePages.map(node => pageElement.appendChild(node))
}

window.addEventListener('locationchange', renderPage)

window.addEventListener('popstate', renderPage)

const initialApp = () => {
  initialSongObjInIndexDB()
  Menu()
  renderPage()
}

initialApp()
