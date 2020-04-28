import { createLazyCache } from './createLazyCache'

describe('createLazyCache', () => {
  it('reads correctly', () => {
    const expectedValue = {}
    const getValue = jest.fn().mockReturnValue(expectedValue)
    const cache = createLazyCache(getValue)
    const value = cache.read()
    expect(value).toBe(expectedValue)
  })

  it('caches', () => {
    const expectedValue = {}
    const getValue = jest.fn().mockReturnValueOnce(expectedValue)
    const cache = createLazyCache(getValue)

    expect(cache.read()).toBe(expectedValue)
    expect(cache.read()).toBe(expectedValue)
  })

  it('doesnd call getValue twice', () => {
    const getValue = jest.fn().mockReturnValue(0)
    const cache = createLazyCache(getValue)

    expect(getValue).toBeCalledTimes(0)
    cache.read()
    cache.read()
    expect(getValue).toBeCalledTimes(1)
  })

  it('invalidates cache if asked', () => {
    const getValue = jest.fn().mockReturnValueOnce('one')
    const cache = createLazyCache(getValue)

    cache.read()
    cache.invalidate()
    expect(getValue).toBeCalledTimes(1)

    getValue.mockReturnValueOnce('two')
    const val = cache.read()

    expect(val).toBe('two')
    expect(getValue).toBeCalledTimes(2)
  })

  it('uses initial value', () => {
    const expectedValue = { getValue: false }
    const getValue = jest.fn().mockReturnValueOnce({ getValue: true })
    const cache = createLazyCache(getValue, expectedValue)

    expect(cache.read()).toBe(expectedValue)
    expect(getValue).toBeCalledTimes(0)
  })

  it('invalidates correctly with initial value', () => {
    const expectedValue = { getValue: true }
    const getValue = jest.fn().mockReturnValueOnce(expectedValue)
    const cache = createLazyCache(getValue, { getValue: false })

    cache.invalidate()
    expect(cache.read()).toBe(expectedValue)
    expect(getValue).toBeCalledTimes(1)
  })
})
