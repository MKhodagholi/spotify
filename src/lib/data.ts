import Album, { Track } from '../class/Album'
import { IAlbumItem } from '../components/AlbumList/AlbumItem'
import data from '../data/data.json'

const getValidData = () => {
  return data.filter(item => !!item.album.album_name)
}

const getAlbumsData = () => {
  const validData = getValidData()

  const albumsData: Array<IAlbumItem> = validData.map(item => {
    const albumData = item.album

    const albumDataObj: IAlbumItem = {
      name: albumData.album_name,
      composerName: albumData.album_composer,
      albumId: albumData.id,
      thumb: albumData.album_thumb,
    }

    return albumDataObj
  })

  console.log(albumsData)

  return albumsData
}

const getAlbumDataWithId = (id: string) => {
  return getValidData().filter(item => item.album.id === id)[0]
}

const getSongDataWithId = (albumId: string, songId: string) => {
  const album = getAlbumDataWithId(albumId)
  let songSelected = album.musics.filter(item => +item.id === +songId)[0]

  const songWithComposerName = {
    ...songSelected,
    componserName: album.album.album_composer,
  }

  return songWithComposerName
}

const getDataOfMadeForYou = () => {
  const validData = getValidData()

  const albums: Array<Album> = validData.map(albumObj => {
    const { id, album_name, album_composer, album_genre, album_thumb } =
      albumObj.album

    const tracks: Array<Track> = albumObj.musics.map(music => {
      const { id, track_name, track_thumb, track_time, track_url } = music
      const track: Track = {
        id: String(id),
        name: track_name,
        thumb: track_thumb,
        time: track_time,
        url: track_url,
        composerName: album_composer,
      }
      return track
    })

    const album = new Album({
      id: String(id),
      name: album_name,
      composer: album_composer,
      genre: album_genre,
      thumb: album_thumb,
      tracks,
    })

    return album
  })

  return albums
}

const getDataOfRecentlyPlayed = () => {
  const data: [] = []

  return data
}

export {
  getAlbumsData,
  getAlbumDataWithId,
  getSongDataWithId,
  getDataOfMadeForYou,
  getDataOfRecentlyPlayed,
}
