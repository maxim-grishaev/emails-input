import styles from './assets/emails-input.css'
import { isValidEmail } from './isValidEmail'

export type Input = HTMLSpanElement
export type Item = HTMLSpanElement
export type ItemCloseButton = HTMLSpanElement
export type Root = HTMLDivElement

export const isItem = (item: { className?: string } | null): item is Item => {
  if (!item || !item.className) {
    return false
  }
  return item.className.split(' ').some((cn) => cn === styles.item)
}

const createItem = (options: { value: string; isValid: boolean; onRemove?: () => void }) => {
  const itemNode = document.createElement('span')
  itemNode.contentEditable = 'false'
  itemNode.className = [styles.item, options.isValid ? styles.validItem : styles.invalidItem].join(
    ' ',
  )
  itemNode.innerHTML = options.value
  const cross = createClose()
  itemNode.appendChild(cross)
  return itemNode as Item
}

export const createEmailItem = (value: string) =>
  createItem({
    value,
    isValid: isValidEmail(value),
  })

const normalizeText = (text: string) =>
  text
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

export const createFragment = (text: string) => {
  const emailItems = normalizeText(text).map(createEmailItem)
  const fragment = document.createDocumentFragment()
  emailItems.forEach((emailItem) => {
    fragment.appendChild(emailItem)
  })
  return fragment
}

export const createInput = (placeholder: string) => {
  const span = document.createElement('span')
  span.dataset.placeholder = `  ${placeholder}`
  span.className = styles.input
  span.contentEditable = 'true'
  return span as Input
}

export const getItemByClose = (close: ItemCloseButton) => close.parentElement as Item

export const isCloseNode = (node: { className?: string }): node is Item =>
  node.className === styles.itemClose

const createClose = () => {
  const span = document.createElement('span')
  span.className = styles.itemClose
  return span as ItemCloseButton
}

export const createRoot = () => {
  const eiNode = document.createElement('div')
  eiNode.contentEditable = 'false'
  eiNode.className = styles.emailsInput
  return eiNode as Root
}
