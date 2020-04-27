# emails-input

[Demo](https://kidskilla.github.io/emails-input/)

## API

### EmailsInput type

```ts
type Listener = () => void
type EmailsInput = (
  root: HTMLElement,
  options?: {
    placeholder?: string
    isValid?: (text: string) => boolean
    mormalizeText?: (text: string) => string[]
  },
) => {
  getItems: () => string[]
  addItems: (text: string) => void
  subscribe: (fn: Listener) => () => void
  unsubscribe: (fn: Listener) => void
  isValid: (text: string) => boolean
}

// Usage:
const inputContainerNode = document.querySelector('#emails-input')
const emailsInput: EmailsInput = window.EmailsInput(inputContainerNode, {
  placeholder: 'add more people...',
})
```

### EmailsInput.getItems

Returns an array of strings, values of items

```ts
const items: string[] = emailsInput.getItems()
```

### EmailsInput.addItems

Adds items to the list. String is being normalised. By default it splits text by comma or a series od spaces (`/\s+/`). Can be overrided using `normalizeText` option. Each item in resulting array is treated as an item in field.

```ts
emailsInput.addItems('abc@abc.abc xyz@xyz.xyz')
// will add 2 items in the input
```

### EmailsInput.sunscribe / EmailsInput.unsubscribe

```ts
const onEdit = () => {
  // triggered when items list changed
  // Use emailsInput.getItems
}
const unsub = emailsInput.subscribe(onEdit)

// To unsubscribe:
unsub()
// same as
emailsInput.unsubscribe(onEdit)
```

### EmailsInput.isValid

Item value validator. Return `true` if a text is a valid item (email by default), or `false` otherwise.
Can be overrided using `isValid` option.

```ts
emailsInput.isValid('abc@abc.abc') // true
emailsInput.isValid('abcabc') // false
```
