const Link = (element: HTMLElement, to: string) => {
  const clickHandler = () => {
    window.history.pushState('', '', to)
  }

  element.addEventListener('click', clickHandler)

  return element
}

export default Link
