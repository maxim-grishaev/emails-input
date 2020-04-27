import {
  createEmailItem,
  isCloseButton,
  isItem,
  getItemByCloseButton,
  ItemCloseButton,
  Item,
} from './dom'

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

  it('getItemByCloseButton', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(getItemByCloseButton(getClose(item))).toBe(item)
  })

  it('isCloseNode', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(isCloseButton(getClose(item))).toBe(true)
    expect(isCloseButton(document.createElement('span'))).toBe(false)
  })
})
