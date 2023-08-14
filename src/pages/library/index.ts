import styles from './library.module.css'

import searchIcon from '../../assets/icons/search_icon.svg'
import ArtistsContent from './ui/ArtistsContent'

enum TAB_NAMES {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  PLAYLISTS = 'playlists',
}

const renderLibraryPageContent = (
  tabName: string,
  contentElement: HTMLElement,
) => {
  if (tabName === TAB_NAMES.PLAYLISTS) {
    // contentElement =
  } else if (tabName === TAB_NAMES.ARTISTS) {
    contentElement.appendChild(ArtistsContent())
  } else if (tabName === TAB_NAMES.ALBUMS) {
    return ''
  } else {
    throw new Error('Invalid tab name.')
  }
}

const LibraryPage = () => {
  const libraryPageElement = document.createElement('div')
  libraryPageElement.classList.add(styles['library-page'])

  const headerTabsElement = document.createElement('div')
  headerTabsElement.classList.add(styles['header-tabs-div'])
  headerTabsElement.innerHTML = `<h2 class=${styles.active}>Music</h2><h2>Podcasts</h2>`

  const tabsElement = document.createElement('div')
  tabsElement.classList.add(styles['tabs-div'])

  tabsElement.innerHTML = `<p>Playlists</p><p class=${styles.active}>Artists</p><p>Albums</p>`

  const toolsElement = document.createElement('div')
  toolsElement.classList.add(styles.tools)

  const searchElement = document.createElement('div')
  searchElement.classList.add(styles['search-div'])

  searchElement.innerHTML = `<img src=${searchIcon} /><input placeholder="Find in artists" id="search" />`

  const filterElement = document.createElement('div')
  filterElement.classList.add(styles.filter)
  filterElement.innerHTML = `<p>Filters</p>`

  toolsElement.appendChild(searchElement)
  toolsElement.appendChild(filterElement)

  const libraryContentElement = document.createElement('div')

  const libraryTabClickHandler = (tabElement: HTMLElement) => {
    const tabName = tabElement.textContent?.toLocaleLowerCase()!

    const searchElement: HTMLInputElement = document.getElementById(
      'search',
    )! as HTMLInputElement
    searchElement.placeholder = `Find in ${tabName}`

    for (const child of tabsElement.children) {
      child.classList.remove(styles.active)
    }
    tabElement.classList.add(styles.active)
    renderLibraryPageContent(tabName, libraryContentElement)
  }

  for (const child of tabsElement.children) {
    child.addEventListener('click', () => {
      libraryTabClickHandler(child as HTMLElement)
    })
  }

  libraryPageElement.appendChild(headerTabsElement)

  libraryPageElement.appendChild(tabsElement)

  libraryPageElement.appendChild(toolsElement)

  libraryPageElement.appendChild(libraryContentElement)

  return libraryPageElement
}

export default LibraryPage
