import { createRoot, createInput, createFragment, createItem } from './dom'
import { createPubSub } from './createPubSub'
import { splitByCommaOrSpaces, isValidEmail, DEFAULT_PLACEHOLDER } from './options'
import { getTextItemsByRoot } from './dom.util'
import { listenInput, listenRoot } from './dom.events'

export const createEmailsInput = (
  container: HTMLElement,
  {
    placeholder = DEFAULT_PLACEHOLDER,
    isValid = isValidEmail,
    normalizeText = splitByCommaOrSpaces,
  }: {
    placeholder?: string
    isValid?: (text: string) => boolean
    normalizeText?: (text: string) => string[]
  } = {},
) => {
  const rootNode = createRoot()
  const input = createInput(placeholder)

  const pubSub = createPubSub()

  const addItems = (text: string) => {
    const itemsStrings = normalizeText(text)
    if (itemsStrings.length === 0) {
      return
    }

    const emailItems = itemsStrings.map((value) => createItem({ value, isValid: isValid(value) }))
    rootNode.appendChild(createFragment(emailItems))
    rootNode.appendChild(input)
    input.focus()
    pubSub.publish()
  }
  listenInput(input, addItems)

  listenRoot(rootNode, input, pubSub.publish)

  rootNode.appendChild(input)
  container.appendChild(rootNode)

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    addItems: addItems,
    isValid,
    getItems: () => getTextItemsByRoot(rootNode),
  }
}
