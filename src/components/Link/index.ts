const Link = <T extends HTMLElement>(element: T, to: string) => {
  const clickHandler = () => {
    window.history.pushState('', '', to)
    window.dispatchEvent(new Event('locationchange'))
  }

  element.addEventListener('click', clickHandler)

  return element
}

export default Link
