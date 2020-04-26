describe('globals', () => {
  it('doesnt present in window', () => {
    expect(window.EmailsInput).toBe(undefined)
  })

  it('defines EmailsInput', () => {
    require('./index')
    expect(typeof window.EmailsInput).toBe('function')
  })
})
