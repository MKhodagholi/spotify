import styles from './notfound.module.css'

const NotFoundPage = () => {
  const element = document.createElement('div')

  element.innerHTML = `<div class=${styles['not-found']}><h3>- Page Not Found - </h3></div>`

  return element
}

export default NotFoundPage
