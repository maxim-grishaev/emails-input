const VALID_EMAIL_RE = /^[-_.+a-z\d]+@[-_.a-z\d]+\.[a-z\d]+$/i

export const isValidEmail = (value: string) => VALID_EMAIL_RE.test(value)
