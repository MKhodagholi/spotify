import './global.css'
import Menu from './components/Menu'
import { Router } from './lib/router'

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
  Menu()
  renderPage()
}

initialApp()
