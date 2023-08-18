import AlbumList from '../../../../components/AlbumList'
import { IAlbumItem } from '../../../../components/AlbumList/AlbumItem'

import { getAlbumsData } from '../../../../lib/data'
import SearchService from '../../../../lib/search'

const AlbumsContent = (albumName?: string) => {
  let albumsContentElement = document.createElement('div')

  let albumsArray: Array<IAlbumItem> = getAlbumsData()

  if (albumName) {
    albumsArray = SearchService.album(albumName)
  }

  albumsContentElement.appendChild(AlbumList(albumsArray))

  return albumsContentElement
}

export default AlbumsContent
