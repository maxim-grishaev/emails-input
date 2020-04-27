import {
  createRoot,
  createInput,
  createFragment,
  isCloseButton,
  getItemByCloseButton,
  Input,
  Root,
  getItems,
} from './dom'
import { isValidEmail } from './isValidEmail'
import { createPubSub } from './createPubSub'

export enum KeyCode {
  COMMA = 188,
  ENTER = 13,
}

const listenInput = (input: Input, onTrigger: () => void) => {
  input.addEventListener('blur', () => {
    if (isValidEmail(input.textContent || '')) {
      onTrigger()
    }
  })
  input.addEventListener('keyup', (evt: KeyboardEvent) => {
    switch (evt.keyCode) {
      case KeyCode.COMMA:
      case KeyCode.ENTER:
        onTrigger()
    }
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
    rootNode.appendChild(createFragment(text))
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
    getItems: () => getItems(rootNode),
  }
}
