import { Track } from '../../class/Album'

import styles from './MusicList.module.css'

import downloadIcon from '../../assets/icons/download_icon.svg'
import Link from '../Link'
import { download } from '../../lib/download'

export const TrackItem = (track: Track) => {
  const trackClickHandler = () => {}
  const downloadClickHandler = () => {
    console.log('hello')
  }

  const trackItemElement = document.createElement('div')

  let trackNameItem = document.createElement('p')
  trackNameItem.addEventListener('click', trackClickHandler)

  trackNameItem.innerText = track.name
  trackNameItem.classList.add(styles['track-name'])
  trackNameItem.addEventListener('click', downloadClickHandler)

  const currentPathname = window.location.href
  trackNameItem = Link(trackNameItem, `${currentPathname}/${track.id}`)

  trackItemElement.appendChild(trackNameItem)

  const trackDownloadInfoElement = document.createElement('div')

  trackDownloadInfoElement.classList.add(styles['track-donload-info'])

  const downloadElement = document.createElement('div')
  const dowlonadImageElement = document.createElement('img')
  // downloadElement.setAttribute('download', track.name)
  // downloadElement.setAttribute('href', track.url)
  // downloadElement.setAttribute('target', '_blank')

  downloadElement.addEventListener('click', downloadClickHandler)

  dowlonadImageElement.src = downloadIcon
  downloadElement.appendChild(dowlonadImageElement)

  trackDownloadInfoElement.appendChild(downloadElement)

  trackDownloadInfoElement.innerHTML += `<span>${track.composerName}</span>`

  trackItemElement.appendChild(trackDownloadInfoElement)

  return trackItemElement
}

const MusicList = (list: Array<Track>) => {
  const musicDivElement = document.createElement('div')
  musicDivElement.classList.add('music-list')

  const musicListElements = list.map(item => TrackItem(item))

  return musicListElements
}

export default MusicList
