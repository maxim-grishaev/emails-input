import { createPubSub } from './createPubSub'

describe('createPubSub', () => {
  it('subscribes', () => {
    const ps = createPubSub()
    ps.subscribe(jest.fn())
    expect(ps.listeners).toHaveLength(1)
  })

  it('ignores duplicates', () => {
    const ps = createPubSub()
    const fn = jest.fn()
    ps.subscribe(fn)
    ps.subscribe(fn)
    expect(ps.listeners).toHaveLength(1)
  })

  it('unsubscribes with return function', () => {
    const ps = createPubSub()
    const unsub = ps.subscribe(jest.fn())
    unsub()
    expect(ps.listeners).toHaveLength(0)
  })

  it('unsubscribes with method', () => {
    const ps = createPubSub()
    const fn = jest.fn()
    ps.subscribe(fn)
    ps.unsubscribe(fn)
    expect(ps.listeners).toHaveLength(0)
  })

  it('notifies everyone', () => {
    const ps = createPubSub()
    const fn = jest.fn()
    const fn2 = jest.fn()
    ps.subscribe(fn)
    ps.subscribe(fn2)
    ps.publish()
    expect(fn).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
  })
})
