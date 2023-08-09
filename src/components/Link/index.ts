const Link = <T extends HTMLElement>(element: T, to: string) => {
  const clickHandler = () => {
    window.history.pushState('', '', to)
  }

  element.addEventListener('click', clickHandler)

  window.dispatchEvent(new Event('locationchange'))

  return element
}

export default Link
