import { createEmailItem, isCloseButton, isItem, getItemByCloseButton } from './dom.util'
import * as dom from './dom'
import * as validate from './isValidEmail'

describe('Item', () => {
  it.each([true, false])('createsItem if isValid=%s', (isValid) => {
    const mockValidation = jest
      .spyOn(validate, 'isValidEmail')
      .mockImplementationOnce(() => isValid)
    const mockCreateItem = jest.spyOn(dom, 'createItem')

    createEmailItem('text')

    expect(mockValidation).toBeCalledTimes(1)
    expect(mockValidation).toBeCalledWith('text')
    expect(mockCreateItem).toBeCalledWith({
      value: 'text',
      isValid,
    })

    mockCreateItem.mockRestore()
    mockValidation.mockRestore()
  })

  it('isItem', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(isItem(item)).toBe(true)
    expect(isItem(document.createElement('div'))).toBe(false)
  })

  const getClose = (item: dom.Item) => item.children.item(0) as dom.ItemCloseButton

  it('getItemByCloseButton', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(getItemByCloseButton(getClose(item))).toBe(item)
  })

  it('isCloseButton', () => {
    const item = createEmailItem('abc@abc.abc')
    expect(isCloseButton(getClose(item))).toBe(true)
    expect(isCloseButton(document.createElement('span'))).toBe(false)
  })
})
