import styles from './emails-input.css'
import { isValidEmail } from './email'

interface EIOptions {
  placeholder: string
}

const createItem = (options: { value: string; isValid: boolean }) => {
  const itemNode = document.createElement('span')
  itemNode.contentEditable = 'false'
  itemNode.className = [styles.item, options.isValid ? styles.validItem : styles.invalidItem].join(
    ' ',
  )
  itemNode.innerHTML = options.value
  return itemNode
}

const createEmailItem = (value: string) =>
  createItem({
    value,
    isValid: isValidEmail(value),
  })

const createText = ({ placeholder }: EIOptions) => {
  const textNode = document.createElement('div')
  textNode.contentEditable = 'true'
  textNode.dataset.placeholder = `  ${placeholder}`
  textNode.className = styles.text
  return textNode
}

export const createEmailsInput = (domNode: HTMLDivElement, options: EIOptions) => {
  domNode.className = styles.wrapper
  const textNode = createText(options)
  textNode.appendChild(createEmailItem('lalala'))
  textNode.appendChild(document.createTextNode(', '))
  textNode.appendChild(createEmailItem('abc@def.def'))
  textNode.appendChild(document.createTextNode(', '))
  domNode.appendChild(textNode)
}
