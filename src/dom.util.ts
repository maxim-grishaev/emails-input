import styles from './assets/emails-input.css'
import { createItem, Item, ItemCloseButton } from './dom'
import { isValidEmail } from './isValidEmail'

export const createEmailItem = (value: string) =>
  createItem({
    value,
    isValid: isValidEmail(value),
  })

export const isItem = (item: { className?: string } | null): item is Item => {
  if (!item || !item.className) {
    return false
  }
  return item.className.split(' ').some((cn) => cn === styles.item)
}

export const getItemByCloseButton = (close: ItemCloseButton) => close.parentElement as Item

export const isCloseButton = (node: { className?: string }): node is ItemCloseButton =>
  node.className === styles.itemClose

export const getTextItemsByRoot = (rootNode: HTMLElement) => {
  const { children } = rootNode
  const { length } = children
  const items = []
  for (let i = 0; i < length; i++) {
    const child = children.item(i)
    if (isItem(child)) {
      items.push(child.textContent)
    }
  }
  return items
}
