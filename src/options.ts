const SEPARATOR_RE = /(?:,|\s+)/

export const splitByCommaOrSpaces = (text: string) =>
  text
    .split(SEPARATOR_RE)
    .map((t) => t.trim())
    .filter(Boolean)

const VALID_EMAIL_RE = /^[-_.+a-z\d]+@[-_.a-z\d]+\.[a-z\d]+$/i

export const isValidEmail = (value: string) => VALID_EMAIL_RE.test(value)

export const DEFAULT_PLACEHOLDER = 'add more people...'
