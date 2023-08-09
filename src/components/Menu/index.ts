import Link from '../Link'
import styles from './Menu.module.css'

import homeIcon from '../../assets/icons/home_icon.svg'
import searchIcon from '../../assets/icons/search_icon.svg'
import libraryIcon from '../../assets/icons/library_icon.svg'

import homeActiveIcon from '../../assets/icons/home-active_icon.svg'
import searchIconIcon from '../../assets/icons/search-active_icon.svg'
import libraryIconIcon from '../../assets/icons/library-active_icon.svg'

interface IMenuItem {
  id: string
  label: string
  link: string
  value: string
  icon: string
  activeIcon: string
  isActive?: boolean
}

const MenuItem = (item: IMenuItem) => {
  const { link, value, label, icon, activeIcon, isActive } = item

  let itemElement = document.createElement('li')

  itemElement = Link(itemElement, link)

  itemElement.innerHTML = `<img src=${
    isActive ? activeIcon : icon
  } /><span>${label}</span>`

  const clickHandler = () => {
    createMenu()
  }

  const pathname = window.location.pathname.split('/')[1]

  if (pathname !== value) itemElement.addEventListener('click', clickHandler)

  itemElement.classList.add(styles.item)

  if (itemElement.classList.contains(styles.active)) {
    if (!isActive) {
      itemElement.classList.remove(styles.active)
    }
  } else {
    if (isActive) {
      itemElement.classList.add(styles.active)
    }
  }

  return itemElement
}

function createMenu() {
  const pathname = window.location.pathname.split('/')[1]

  const items: Array<IMenuItem> = [
    {
      id: '1',
      label: 'Home',
      link: '/',
      value: '',
      icon: homeIcon,
      activeIcon: homeActiveIcon,
      isActive: '' === pathname,
    },
    {
      id: '2',
      label: 'Search',
      link: '/search',
      value: 'search',
      icon: searchIcon,
      activeIcon: searchIconIcon,
      isActive: 'search' === pathname,
    },
    {
      id: '3',
      label: 'Your Library',
      link: '/library',
      value: 'library',
      icon: libraryIcon,
      activeIcon: libraryIconIcon,
      isActive: 'library' === pathname,
    },
  ]

  const menuElement = document.getElementById('menu')!

  menuElement.innerHTML = ''

  items.forEach(item => menuElement.append(MenuItem(item)))

  return menuElement
}

export default createMenu
