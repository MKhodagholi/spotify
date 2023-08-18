import { getAlbumsData, getArtistsData, getValidData } from './data'

const searchArtist = (artistName: string) => {
  const artistsData = getArtistsData()

  const result = artistsData.filter(artist => {
    if (artist.name.toLocaleLowerCase().includes(artistName)) {
      return artist
    }
  })

  return result
}

const searchAlbum = (albumName: string) => {
  const albumsData = getAlbumsData()

  return albumsData.filter(album => {
    if (album.name.toLowerCase().includes(albumName)) return album
  })
}

interface Song {
  id: number
  track_name: string
  track_time: string
  track_url: string
  track_thumb: string
  is_favorited: number
  like_status: string
  nonce: string
}

const searchSong = (songName: string) => {
  const albumsData = getValidData()

  const arrayResult: Array<Song> = []

  albumsData.forEach(({ musics }) =>
    (musics as Array<Song>).forEach(music => {
      if (music.track_name.includes(songName)) {
        arrayResult.push(music)
      }
    }),
  )

  console.log(arrayResult)

  return arrayResult
}

const SearchService = {
  artist: searchArtist,
  album: searchAlbum,
  song: searchSong,
}

export default SearchService
