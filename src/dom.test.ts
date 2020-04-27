import { createInput, createItem, createRoot, createFragment } from './dom'

describe('create DOM stuff', () => {
  it('createInput', () => {
    expect(createInput('test ph')).toMatchInlineSnapshot(`
      <span
        class="input"
        contenteditable="true"
        data-placeholder="test ph"
      />
    `)
  })

  it('createItem', () => {
    expect(createItem({ value: 'good val', isValid: true })).toMatchInlineSnapshot(`
      <span
        class="item validItem"
        contenteditable="false"
      >
        good val
        <span
          class="itemClose"
        />
      </span>
    `)
    expect(createItem({ value: 'bad val', isValid: false })).toMatchInlineSnapshot(`
      <span
        class="item invalidItem"
        contenteditable="false"
      >
        bad val
        <span
          class="itemClose"
        />
      </span>
    `)
  })

  it('createRoot', () => {
    expect(createRoot()).toMatchInlineSnapshot(`
      <div
        class="emailsInput"
      />
    `)
  })

  it('createFragment', () => {
    expect(createFragment([])).toMatchInlineSnapshot(`<DocumentFragment />`)
    expect(createFragment([document.createElement('foo')])).toMatchInlineSnapshot(`
      <DocumentFragment>
        <foo />
      </DocumentFragment>
    `)
  })
})
