import styles from './assets/emails-input.css'
import { Item, ItemCloseButton, Root, Input } from './dom'
import { input } from './assets/emails-input.css'

export const isItem = (item: { className?: string } | null): item is Item => {
  if (!item || !item.className) {
    return false
  }
  return item.className.split(' ').some((cn) => cn === styles.item)
}

export const getItemByCloseButton = (close: ItemCloseButton) => close.parentElement as Item

export const isCloseButton = (node: { className?: string }): node is ItemCloseButton =>
  node.className === styles.itemClose

export const getTextItemsByRoot = (rootNode: Root) => {
  const { children } = rootNode
  const { length } = children
  const items = [] as string[]
  for (let i = 0; i < length; i++) {
    const child = children.item(i)
    if (isItem(child)) {
      const text = child.textContent
      if (text) {
        items.push(text)
      }
    }
  }
  return items
}
