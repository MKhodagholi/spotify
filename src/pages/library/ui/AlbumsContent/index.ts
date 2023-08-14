import AlbumList from '../../../../components/AlbumList'
import { IAlbumItem } from '../../../../components/AlbumList/AlbumItem'

import { getAlbumsData } from '../../../../lib/data'

const AlbumsContent = () => {
  let albumsContentElement = document.createElement('div')

  const albumsArray: Array<IAlbumItem> = getAlbumsData()

  albumsContentElement.appendChild(AlbumList(albumsArray))

  return albumsContentElement
}

export default AlbumsContent
