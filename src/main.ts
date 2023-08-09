import './global.css'
import Menu from './components/Menu'
import { Router } from './lib/router'

const pageElement: HTMLDivElement = document.querySelector('#page')!

const renderPage = () => {
  pageElement.innerHTML = ''
  const nodePages = Router()

  nodePages.map(node => pageElement.appendChild(node))
}

window.addEventListener('locationchange', renderPage)

const initialApp = () => {
  Menu()
  renderPage()
}

initialApp()
