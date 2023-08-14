import ArtistList from '../../../../components/ArtistList'
import { IArtistItem } from '../../../../components/ArtistList/ArtistItem'

const ArtistsContent = () => {
  let artistContentElement = document.createElement('div')

  const artistArray: Array<IArtistItem> = [{ name: 'ahmad' }, { name: 'akbar' }]

  artistContentElement.appendChild(ArtistList(artistArray))

  return artistContentElement
}

export default ArtistsContent
