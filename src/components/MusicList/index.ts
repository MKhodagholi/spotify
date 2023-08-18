import { Track } from '../../class/Album'

import styles from './MusicList.module.css'

import downloadIcon from '../../assets/icons/download_icon.svg'
import downloadActiveIcon from '../../assets/icons/download-active_icon.svg'
import Link from '../Link'
import { DownloadService } from '../../lib/indexDB'
import { download } from '../../lib/download'

export const TrackItem = async (track: Track) => {
  let blob = await DownloadService.getDataDownloadItem(track.id)

  const downloadClickHandler = async () => {
    let blobMp3
    if (blob) {
      blobMp3 = blob.slice(0, blob.size, 'audio/mpeg')
    } else {
      isDownloadingElement.innerText = 'Downloading...'
      const res = await fetch(track.url)
      const blob = await res.blob()

      DownloadService.saveSongDataInIndexDB({
        id: track.id,
        name: track.name,
        albumId: track.albumId,
        data: blob,
      })

      dowlonadImageElement.src = downloadActiveIcon

      blobMp3 = blob.slice(0, blob.size, 'audio/mpeg')
    }

    isDownloadingElement.innerText = ''

    download({ blob: blobMp3, fileName: track.name })
  }

  const trackItemElement = document.createElement('div')

  let trackNameItem = document.createElement('p')

  trackNameItem.innerText = track.name
  trackNameItem.classList.add(styles['track-name'])

  const currentPathname = window.location.href
  trackNameItem = Link(trackNameItem, `${currentPathname}/${track.id}`)

  trackItemElement.appendChild(trackNameItem)

  const trackDownloadInfoElement = document.createElement('div')

  trackDownloadInfoElement.classList.add(styles['track-donload-info'])

  const downloadElement = document.createElement('div')
  downloadElement.style.cursor = 'pointer'
  const dowlonadImageElement = document.createElement('img')

  downloadElement.addEventListener('click', downloadClickHandler)

  if (blob) {
    dowlonadImageElement.src = downloadActiveIcon
  } else {
    dowlonadImageElement.src = downloadIcon
  }

  const isDownloadingElement = document.createElement('p')
  isDownloadingElement.innerText = ''

  downloadElement.appendChild(dowlonadImageElement)

  trackDownloadInfoElement.appendChild(downloadElement)

  const composerNameElement = document.createElement('span')

  composerNameElement.innerText = track.composerName

  trackDownloadInfoElement.appendChild(composerNameElement)

  trackItemElement.appendChild(trackDownloadInfoElement)

  trackItemElement.appendChild(isDownloadingElement)

  return trackItemElement
}

const MusicList = async (list: Array<Track>) => {
  const musicDivElement = document.createElement('div')
  musicDivElement.classList.add('music-list')

  const musicListElements = await Promise.all(
    list.map(async item => {
      return await TrackItem(item)
    }),
  )

  return musicListElements
}

export default MusicList
