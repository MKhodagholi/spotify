export const removeAllAudio = () => {
  document.querySelectorAll('audio').forEach(el => el.remove())
}
