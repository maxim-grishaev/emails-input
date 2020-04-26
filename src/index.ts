import { createEmailsInput } from './emails-input'

declare global {
  interface Window {
    EmailsInput: typeof createEmailsInput
  }
}

window.EmailsInput = createEmailsInput
