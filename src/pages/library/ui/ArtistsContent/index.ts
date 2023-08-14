import ArtistList from '../../../../components/ArtistList'
import { IArtistItem } from '../../../../components/ArtistList/ArtistItem'
import { getArtistsData } from '../../../../lib/data'

const ArtistsContent = () => {
  let artistContentElement = document.createElement('div')

  const artistArray: Array<IArtistItem> = getArtistsData()

  artistContentElement.appendChild(ArtistList(artistArray))

  return artistContentElement
}

export default ArtistsContent
