import styles from './assets/emails-input.css'

export type Input = HTMLSpanElement
export type Item = HTMLSpanElement
export type ItemCloseButton = HTMLSpanElement
export type Root = HTMLDivElement

export const createItem = (options: { value: string; isValid: boolean; onRemove?: () => void }) => {
  const itemNode = document.createElement('span')
  itemNode.setAttribute('contenteditable', String(false))
  const validityClassName = options.isValid ? styles.validItem : styles.invalidItem
  itemNode.className = [styles.item, validityClassName].join(' ')
  itemNode.innerHTML = options.value
  const cross = createCloseButton()
  itemNode.appendChild(cross)
  return itemNode as Item
}

export const createFragment = (items: HTMLElement[]) => {
  const fragment = document.createDocumentFragment()
  items.forEach((item) => {
    fragment.appendChild(item)
  })
  return fragment
}

export const createInput = (placeholder: string) => {
  const span = document.createElement('span')
  span.dataset.placeholder = placeholder
  span.className = styles.input
  span.setAttribute('contenteditable', String(true))
  return span as Input
}

const createCloseButton = () => {
  const span = document.createElement('span')
  span.className = styles.itemClose
  return span as ItemCloseButton
}

export const createRoot = () => {
  const eiNode = document.createElement('div')
  eiNode.className = styles.emailsInput
  return eiNode as Root
}
