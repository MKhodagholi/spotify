export const download = async (url: string, filename: string) => {
  console.log('hello')
  const data = await fetch(url)
  const blob = await data.blob()
  const objectUrl = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.setAttribute('href', objectUrl)
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}
