type Listener = () => void

export const createEventsManager = () => {
  let listeners = [] as Listener[]

  const unsubscribe = (onEdit: Listener) => {
    listeners = listeners.filter((fn) => fn !== onEdit)
  }

  const subscribe = (onEdit: Listener) => {
    // ignore duplicates
    if (listeners.some((fn) => fn === onEdit)) {
      return
    }

    listeners.push(onEdit)

    // return unsubscribe
    return () => unsubscribe(onEdit)
  }

  return {
    listeners,
    subscribe,
    unsubscribe,
    notify: () => {
      listeners.forEach((fn) => fn())
    },
  }
}
