export const createLazyCache = <T>(getValue: () => T, initValue?: T) => {
  let hasValue = initValue !== undefined
  let value: T | undefined = initValue
  return {
    invalidate: () => {
      value = undefined
      hasValue = false
    },
    read: () => {
      if (!hasValue) {
        value = getValue()
        hasValue = true
      }
      return value as T
    },
  }
}
