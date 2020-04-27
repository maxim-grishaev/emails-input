import { createEmailItem, isCloseNode, isItem, getItemByClose, ItemCloseButton, Item } from './dom'

const getClose = (item: Item) => item.children.item(0) as ItemCloseButton

describe('Item', () => {
  it('createsItem', () => {
    expect(createEmailItem('text')).toMatchInlineSnapshot(`
      <span
        class="item invalidItem"
      >
        text
        <span
          class="itemClose"
        />
      </span>
    `)
    expect(createEmailItem('abc@abc.abc')).toMatchInlineSnapshot(`
      <span
        class="item validItem"
      >
        abc@abc.abc
        <span
          class="itemClose"
        />
      </span>
    `)
  })

  it('tests corrctly', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(isItem(item)).toBe(true)
    expect(isItem(document.createElement('div'))).toBe(false)
  })

  it('getItemByClose', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(getItemByClose(getClose(item))).toBe(item)
  })

  it('isCloseNode', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(isCloseNode(getClose(item))).toBe(true)
    expect(isCloseNode(document.createElement('span'))).toBe(false)
  })
})
