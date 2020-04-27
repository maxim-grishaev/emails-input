import { isItem } from './dom'

const getItems = (rootNode: HTMLElement) => {
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

export const createApi = ({
  rootNode,
  update,
}: {
  rootNode: HTMLElement
  update: (text: string) => void
}) => ({
  // subscribe: (onEdit: (items: string[]) => void) => {
  //   //
  // },
  addItem: update,
  getItems: () => getItems(rootNode),
})
