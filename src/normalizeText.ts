const SEPARATOR_RE = /(?:,|\s+)/

export const normalizeText = (text: string) =>
  text
    .split(SEPARATOR_RE)
    .map((t) => t.trim())
    .filter(Boolean)
