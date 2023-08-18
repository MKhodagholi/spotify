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

export interface Song {
  id: string
  albumId: string
  name: string
  url: string
  thumb: string
  composerName: string
}

const searchSong = (songName: string) => {
  const albumsData = getValidData()

  const arrayResult: Array<Song> = []

  albumsData.forEach(({ album, musics }) =>
    musics.forEach(music => {
      if (music.track_name.toLocaleLowerCase().includes(songName)) {
        arrayResult.push({
          id: String(music.id),
          albumId: album.id,
          name: music.track_name,
          url: music.track_url,
          thumb: music.track_thumb,
          composerName: album.album_composer,
        })
      }
    }),
  )

  return arrayResult
}

const SearchService = {
  artist: searchArtist,
  album: searchAlbum,
  song: searchSong,
}

export default SearchService
