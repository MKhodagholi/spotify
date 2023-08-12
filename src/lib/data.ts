import Album, { Track } from '../class/Album'
import data from '../data/data.json'

const getValidData = () => {
  return data.filter(item => !!item.album.album_name)
}

const getAlbumDataWithId = (id: string) => {
  return getValidData().filter(item => item.album.id === id)[0]
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

export { getAlbumDataWithId, getDataOfMadeForYou, getDataOfRecentlyPlayed }
