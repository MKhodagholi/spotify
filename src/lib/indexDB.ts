interface SongItem {
  id: string
  albumId: string
  data: Blob
}

let db: IDBDatabase

const initialSongObjInIndexDB = () => {
  const request = indexedDB.open('songs', 2)

  request.onsuccess = () => {
    db = request.result

    console.log(db)
  }

  request.onupgradeneeded = () => {
    if (!db.objectStoreNames.contains('downloads')) {
      db.createObjectStore('downloads')
    }
  }

  request.onerror = e => {
    console.log(e)
  }
}

function addDownloadsItem(item: SongItem) {
  new Promise<void>((resolve, reject) => {
    const tx = db.transaction('downloads', 'readwrite')
    const store = tx.objectStore('downloads')

    store.put(item, item.id)
    tx.oncomplete = () => {
      resolve()
    }

    tx.onerror = e => {
      console.log('error!', e)
      reject()
    }
  })
}

function getDataDownloadItem(itemId: string) {
  return new Promise<Blob>((resolve, reject) => {
    const tx = db.transaction('downloads', 'readonly')

    const store = tx.objectStore('downloads')

    const item = store.get(itemId)

    tx.oncomplete = () => {
      const itemResult = item.result as SongItem
      resolve(itemResult?.data)
    }

    tx.onerror = e => {
      console.log('error!', e)
      reject()
    }
  })
}

const saveSongDataInIndexDB = (songObj: SongItem) => {
  addDownloadsItem(songObj)
}

export { initialSongObjInIndexDB, saveSongDataInIndexDB, getDataDownloadItem }
