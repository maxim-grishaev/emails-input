import { getClipboardText } from './getClipboardText'
import { isCloseButton, getItemByCloseButton } from './dom.util'
import { Root, Input } from './dom'

export enum KeyCode {
  COMMA = 188,
  ENTER = 13,
}

export const listenInput = (input: Input, onAdd: (text: string) => void) => {
  const flushInputValue = () => {
    const text = input.textContent || ''
    if (text) {
      onAdd(text)
      input.innerHTML = ''
    }
  }

  input.addEventListener('blur', flushInputValue)

  input.addEventListener('keyup', (evt: KeyboardEvent) => {
    switch (evt.keyCode) {
      case KeyCode.COMMA:
      case KeyCode.ENTER:
        flushInputValue()
    }
  })

  input.addEventListener('paste', (evt: ClipboardEvent) => {
    evt.preventDefault()
    flushInputValue()
    const clipboardText = getClipboardText(evt)
    if (clipboardText) {
      onAdd(clipboardText)
    }
  })
}

export const listenRoot = (rootNode: Root, input: Input, onRemove: () => void) => {
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
        rootNode.removeChild(item)
        onRemove()
      }
    }
  })
}
