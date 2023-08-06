import Link from '../Link'
import styles from './Menu.module.css'

interface IMenuItem {
  id: string
  label: string
  link: string
  image: string
}

const MenuItem = (item: IMenuItem) => {
  const { link, label, image } = item

  const itemElement = document.createElement('div')
  itemElement.innerHTML = `<div class=${styles.item}><img src=${image} /><span>${label}</span></div>`

  return Link(itemElement, link)
}

const Menu = () => {
  const items: Array<IMenuItem> = [
    { id: '1', label: 'Home', link: '/', image: '' },
    { id: '1', label: 'Search', link: '/search', image: '' },
    { id: '1', label: 'Your Library', link: '/library', image: '' },
  ]

  const menuElement = document.createElement('div')

  items.forEach(item => menuElement.append(MenuItem(item)))

  return menuElement
}

export default Menu
