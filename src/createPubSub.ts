type Listener = () => void

export const createPubSub = () => {
  let listeners = [] as Listener[]

  const unsubscribe = (onNotify: Listener) => {
    listeners = listeners.filter((fn) => fn !== onNotify)
  }

  const subscribe = (onNotify: Listener) => {
    // ignore duplicates
    if (listeners.some((fn) => fn === onNotify)) {
      return () => unsubscribe(onNotify)
    }
    listeners.push(onNotify)
    // return unsubscribe
    return () => unsubscribe(onNotify)
  }

  return {
    get listeners() {
      return listeners
    },
    subscribe,
    unsubscribe,
    publish: () => {
      listeners.forEach((fn) => fn())
    },
  }
}
