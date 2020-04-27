import { createEmailsInput } from './createEmailsInput'

declare global {
  interface Window {
    EmailsInput: typeof createEmailsInput
  }
}

window.EmailsInput = createEmailsInput
