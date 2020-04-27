import { isCloseButton, isItem, getItemByCloseButton } from './dom.util'
import * as dom from './dom'
import { createItem } from './dom'

const createEmailItem = () =>
  createItem({
    value: 'abc@abc.abc',
    isValid: true,
  })

describe('Item', () => {
  it('isItem', () => {
    const item = createEmailItem()
    expect(isItem(item)).toBe(true)
    expect(isItem(document.createElement('div'))).toBe(false)
  })

  const getClose = (item: dom.Item) => item.children.item(0) as dom.ItemCloseButton

  it('getItemByCloseButton', () => {
    const item = createEmailItem()
    expect(getItemByCloseButton(getClose(item))).toBe(item)
  })

  it('isCloseButton', () => {
    const item = createEmailItem()
    expect(isCloseButton(getClose(item))).toBe(true)
    expect(isCloseButton(document.createElement('span'))).toBe(false)
  })
})
