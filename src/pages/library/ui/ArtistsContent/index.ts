import ArtistList from '../../../../components/ArtistList'
import { IArtistItem } from '../../../../components/ArtistList/ArtistItem'
import { getArtistsData } from '../../../../lib/data'
import SearchService from '../../../../lib/search'

const ArtistsContent = (artistName?: string) => {
  let artistContentElement = document.createElement('div')

  let artistArray: Array<IArtistItem> = getArtistsData()

  if (artistName) {
    artistArray = SearchService.artist(artistName)
  }

  artistContentElement.appendChild(ArtistList(artistArray))

  return artistContentElement
}

export default ArtistsContent
