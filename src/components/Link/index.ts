const Link = <T extends HTMLElement>(element: T, to: string) => {
  const clickHandler = () => {
    window.history.pushState('', '', to)
  }

  element.addEventListener('click', clickHandler)

  return element
}

export default Link
