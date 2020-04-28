import { createRoot, createInput, createFragment, createItem } from './dom'
import { createPubSub } from './createPubSub'
import { splitByCommaOrSpaces, isValidEmail, DEFAULT_PLACEHOLDER } from './options'
import { getTextItemsByRoot } from './dom.util'
import { listenInput, listenRoot } from './dom.events'
import { createLazyCache } from './createLazyCache'

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
  const cache = createLazyCache(() => getTextItemsByRoot(rootNode), [])

  const pubSub = createPubSub()

  const createNormalizedItem = (value: string) =>
    createItem({
      value,
      isValid: isValid(value),
    })

  const addItems = (text: string) => {
    const itemsStrings = normalizeText(text)
    if (itemsStrings.length === 0) {
      return
    }

    const normalizedItems = itemsStrings.map(createNormalizedItem)
    const itemsFragment = createFragment(normalizedItems)
    rootNode.appendChild(itemsFragment)
    rootNode.appendChild(input)
    cache.invalidate()
    input.focus()
    pubSub.publish()
  }

  listenInput(input, addItems)

  const onRemoveItem = () => {
    cache.invalidate()
    pubSub.publish()
  }

  listenRoot(rootNode, input, onRemoveItem)

  rootNode.appendChild(input)
  container.appendChild(rootNode)

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    addItems,
    isValid,
    getItems: cache.read,
  }
}
