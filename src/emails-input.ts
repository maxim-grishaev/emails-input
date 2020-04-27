import styles from './assets/emails-input.css'
import {
  createRoot,
  createInput,
  createFragment,
  isCloseNode,
  getItemByClose,
  Input,
  Root,
} from './dom'
import { isTriggerKeyCode } from './keyCode'
import { isValidEmail } from './email'
import { createApi } from './createApi'

interface EIOptions {
  placeholder: string
}

const listen = (input: Input, onTrigger: () => void) => {
  input.addEventListener('blur', () => {
    if (isValidEmail(input.textContent || '')) {
      onTrigger()
    }
  })
  input.addEventListener('keyup', (evt: KeyboardEvent) => {
    if (isTriggerKeyCode(evt.keyCode)) {
      onTrigger()
    }
  })
}

const updateText = (text: string, input: Input, rootNode: Root) => {
  rootNode.appendChild(createFragment(text))
  rootNode.appendChild(input)
  input.focus()
}

const update = (input: Input, rootNode: Root) => {
  const text = input.textContent || ''
  input.innerHTML = ''
  updateText(text, input, rootNode)
}

export const createEmailsInput = (container: HTMLElement, options: EIOptions) => {
  const rootNode = createRoot()
  const input = createInput(options.placeholder)

  listen(input, () => update(input, rootNode))

  rootNode.addEventListener('click', (evt: MouseEvent) => {
    const target = evt.target as HTMLElement
    if (!target) {
      return
    }
    if (target === rootNode) {
      input.focus()
      return
    }
    if (isCloseNode(target)) {
      const item = getItemByClose(target)
      if (item) {
        rootNode.removeChild(item as Node)
      }
    }
  })

  rootNode.appendChild(input)
  container.appendChild(rootNode)

  return createApi({ rootNode, update: (text: string) => updateText(text, input, rootNode) })
}
