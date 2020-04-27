declare global {
  interface Window {
    clipboardData?: {
      getData: (type: 'Text') => string
    }
  }
}

interface ClipboardEventIEFix extends ClipboardEvent {
  originalEvent?: ClipboardEvent
}

export const getClipboardText = (evt: ClipboardEventIEFix) => {
  const clipboardData = evt.clipboardData || evt.originalEvent?.clipboardData
  if (clipboardData) {
    return clipboardData.getData('text/plain')
  }
  if (window.clipboardData) {
    return window.clipboardData.getData('Text')
  }
}
