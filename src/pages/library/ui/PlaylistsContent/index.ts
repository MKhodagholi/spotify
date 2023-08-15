import likeIcon from '../../../../assets/icons/like-active_icon.svg'
import { IPlayListItem } from '../../../../components/PlayList/PlayListItem'
import PlayList from '../../../../components/PlayList'

const PlaylistsContent = () => {
  let artistContentElement = document.createElement('div')

  const playlistArray: Array<IPlayListItem> = [
    { name: 'Likes', image: likeIcon, link: 'Liked_Songs' },
  ]

  artistContentElement.appendChild(PlayList(playlistArray))

  return artistContentElement
}

export default PlaylistsContent
