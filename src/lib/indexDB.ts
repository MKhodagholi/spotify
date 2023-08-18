interface SongItem {
  id: string
  name: string
  albumId: string
  data: Blob
}

interface LikeItem {
  id: string
  name: string
  albumId: string
  composerName: string
  image: string
  url: string
}

interface LikeAlbumItem {
  id: string
  name: string
  composerName: string
  image: string
}

const createDBIfNotExist = () => {
  if (!db) {
    const requset = indexedDB.open('songs', 5)

    requset.onsuccess = () => {
      db = requset.result
    }
  }
}

let db: IDBDatabase

const initialObjStoreInIndexDB = () => {
  const request = indexedDB.open('songs', 5)

  request.onsuccess = () => {
    db = request.result
  }

  request.onupgradeneeded = () => {
    let db = request.result
    if (!db.objectStoreNames.contains('downloads')) {
      db.createObjectStore('downloads')
    }
    if (!db.objectStoreNames.contains('likes')) {
      db.createObjectStore('likes')
    }
  }

  request.onerror = e => {
    console.log(e)
  }
}

function addDownloadsItem(item: SongItem) {
  new Promise<void>((resolve, reject) => {
    createDBIfNotExist()
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
    createDBIfNotExist()

    const tx = db.transaction('downloads', 'readonly')

    const store = tx.objectStore('downloads')

    let item = store.get(itemId)

    tx.oncomplete = () => {
      const itemResult = item.result as SongItem
      resolve(itemResult?.data)
    }

    tx.onerror = e => {
      reject()
    }
  })
}

const saveSongDataInIndexDB = (songObj: SongItem) => {
  addDownloadsItem(songObj)
}

const addLikesItem = (item: LikeItem | LikeAlbumItem) => {
  return new Promise<void>((resolve, reject) => {
    createDBIfNotExist()

    const tx = db.transaction('likes', 'readwrite')

    const store = tx.objectStore('likes')

    store.put(item, item.id)

    tx.oncomplete = () => {
      resolve()
    }

    tx.onerror = () => {
      reject()
    }
  })
}

const removeLikesItem = (itemId: string) => {
  return new Promise<void>((resolve, reject) => {
    createDBIfNotExist()

    const tx = db.transaction('likes', 'readwrite')

    const store = tx.objectStore('likes')

    store.delete(itemId)

    tx.oncomplete = () => {
      resolve()
    }

    tx.onerror = () => {
      reject()
    }
  })
}

const getDataLikeItem = (itemId: string) => {
  return new Promise<LikeItem | LikeAlbumItem>((resolve, reject) => {
    createDBIfNotExist()

    const tx = db.transaction('likes', 'readonly')

    const store = tx.objectStore('likes')

    const item = store.get(itemId)

    tx.oncomplete = () => {
      const itemResult = item.result as LikeItem

      resolve(itemResult)
    }

    tx.onerror = () => {
      reject()
    }
  })
}

const saveLikeDataInIndexDB = async (likeItem: LikeItem | LikeAlbumItem) => {
  await addLikesItem(likeItem)
}

const getLikesitems = () => {
  return new Promise<Array<LikeItem | LikeAlbumItem>>((resolve, reject) => {
    createDBIfNotExist()

    if (db) {
      const tx = db.transaction('likes', 'readonly')

      const store = tx.objectStore('likes')

      const item = store.getAll()

      tx.oncomplete = () => {
        const itemResult = item.result

        resolve(itemResult)
      }

      tx.onerror = () => {
        reject()
      }
    }
  })
}

const LikeService = {
  getDataLikeItem,
  saveLikeDataInIndexDB,
  removeLikesItem,
  getLikesitems,
}

const DownloadService = {
  saveSongDataInIndexDB,
  getDataDownloadItem,
}

export { initialObjStoreInIndexDB, LikeService, DownloadService }
