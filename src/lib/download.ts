export const download = async (blob: Blob, filename: string) => {
  const blobMp3 = blob.slice(0, blob.size, 'audio/mpeg')
  const objectUrl = URL.createObjectURL(blobMp3)

  const link = document.createElement('a')
  link.download = filename

  link.href = objectUrl

  link.click()

  URL.revokeObjectURL(objectUrl)
}
