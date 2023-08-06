import './global.css'
import Menu from './components/Menu'
import HomePage from './pages/home'

const pageElement: HTMLDivElement = document.querySelector('#page')!

pageElement.append(HomePage())

Menu()
