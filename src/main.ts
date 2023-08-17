import './global.css'
import Menu from './components/Menu'
import { Router } from './lib/router'
import { initialObjStoreInIndexDB } from './lib/indexDB'

const pageElement: HTMLDivElement = document.querySelector('#page')!

const renderPage = async () => {
  pageElement.innerHTML = ''
  Menu()
  const nodePages = await Router()

  nodePages.map(node => pageElement.appendChild(node))
}

window.addEventListener('locationchange', renderPage)

window.addEventListener('popstate', renderPage)

const initialApp = async () => {
  initialObjStoreInIndexDB()
  Menu()
  await renderPage()
}

initialApp()
