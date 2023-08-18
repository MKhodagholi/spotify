import Album, { Track } from '../class/Album'
import { IAlbumItem } from '../components/AlbumList/AlbumItem'
import { IArtistItem } from '../components/ArtistList/ArtistItem'
import data from '../data/data.json'

import artist1Image from '../assets/images/artist-1_image.svg'
import artist2Image from '../assets/images/artist-2_image.svg'
import artist3Image from '../assets/images/artist-3_image.svg'
import artist4Image from '../assets/images/artist-4_image.svg'
import artist5Image from '../assets/images/artist-5_image.svg'
import artist6Image from '../assets/images/artist-6_image.svg'

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

  return albumsData
}

const getArtistsData = () => {
  const validData = getValidData()

  const artistsData: Array<IArtistItem> = validData.map((item, index) => {
    const artistData = item.album

    let artistImage = artist1Image

    switch ((index + 1) % 6) {
      case 0:
        artistImage = artist6Image
        break
      case 1:
        artistImage = artist1Image
        break
      case 2:
        artistImage = artist2Image
        break
      case 3:
        artistImage = artist3Image
        break
      case 4:
        artistImage = artist4Image
        break
      case 5:
        artistImage = artist5Image
        break
      default:
        artistImage = artist1Image
        break
    }

    const artistDataObj: IArtistItem = {
      name: artistData.album_composer,
      image: artistImage,
    }

    return artistDataObj
  })

  return artistsData
}

const getSongDataWithArtistName = (artistName: string) => {
  const artistAlbums = getValidData().filter(
    item => item.album.album_composer === artistName,
  )

  if (artistAlbums.length <= 0) return []

  const artistSongs = artistAlbums.map(album =>
    album.musics.map(music => ({ ...music, albumId: album.album.id })),
  )[0]

  return artistSongs
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
        albumId: albumObj.album.id,
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
  getValidData,
  getAlbumsData,
  getArtistsData,
  getSongDataWithArtistName,
  getAlbumDataWithId,
  getSongDataWithId,
  getDataOfMadeForYou,
  getDataOfRecentlyPlayed,
}
