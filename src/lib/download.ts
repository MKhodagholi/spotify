interface BlobData {
  blob: Blob
  fileName: string
}

export const download = async (data: BlobData) => {
  const { blob, fileName } = data
  const blobMp3 = blob.slice(0, blob.size, 'audio/mpeg')
  const objectUrl = URL.createObjectURL(blobMp3)

  const link = document.createElement('a')
  link.download = fileName

  link.href = objectUrl

  link.click()

  URL.revokeObjectURL(objectUrl)
}
