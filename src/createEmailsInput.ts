import { createRoot, createInput, createFragment, Input, Root } from './dom'
import { createPubSub } from './createPubSub'
import { getClipboardText } from './getClipboardText'
import { normalizeText } from './normalizeText'
import {
  createEmailItem,
  isCloseButton,
  getItemByCloseButton,
  getTextItemsByRoot,
} from './dom.util'

export enum KeyCode {
  COMMA = 188,
  ENTER = 13,
}

const listenInput = (input: Input, onTrigger: () => void) => {
  input.addEventListener('blur', () => {
    onTrigger()
  })
  input.addEventListener('keyup', (evt: KeyboardEvent) => {
    switch (evt.keyCode) {
      case KeyCode.COMMA:
      case KeyCode.ENTER:
        onTrigger()
    }
  })
  input.addEventListener('paste', (evt: ClipboardEvent) => {
    evt.preventDefault()
    const text = getClipboardText(evt)
    if (!text) {
      return
    }
    input.appendChild(document.createTextNode(' ' + text))
    onTrigger()
  })
}

const listenRoot = (rootNode: Root, input: Input, onRemove: () => void) => {
  rootNode.addEventListener('click', (evt: MouseEvent) => {
    const target = evt.target as HTMLElement
    if (!target) {
      return
    }
    if (target === rootNode) {
      input.focus()
      return
    }
    if (isCloseButton(target)) {
      const item = getItemByCloseButton(target)
      if (item) {
        rootNode.removeChild(item as Node)
        onRemove()
      }
    }
  })
}

export const createEmailsInput = (
  container: HTMLElement,
  options: {
    placeholder: string
  },
) => {
  const rootNode = createRoot()
  const input = createInput(options.placeholder)

  const pubSub = createPubSub()

  const updateItems = (text: string) => {
    const itemsStrings = normalizeText(text)
    if (itemsStrings.length === 0) {
      return
    }

    const emailItems = itemsStrings.map(createEmailItem)
    rootNode.appendChild(createFragment(emailItems))
    rootNode.appendChild(input)
    input.focus()
    pubSub.publish()
  }

  listenInput(input, () => {
    const text = input.textContent || ''
    input.innerHTML = ''
    updateItems(text)
  })

  listenRoot(rootNode, input, pubSub.publish)

  rootNode.appendChild(input)
  container.appendChild(rootNode)

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    addItem: updateItems,
    getItems: () => getTextItemsByRoot(rootNode),
  }
}
