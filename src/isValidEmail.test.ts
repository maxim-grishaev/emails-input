import { isValidEmail } from './isValidEmail'

describe('isValidEmail', () => {
  it.each([
    'abc@def.ghi',
    'abc123@def.ghi',
    'abc123@def.ghi',
    'abc.abc@def.ghi',
    'abc-abc@def.ghi',
    'abc+abc@def.ghi',
    'abc.abc-abc+123@def.ghi',
    'abc-abc@de-f.ghi',
    'abc.abc@d.e-f.ghi',
  ])('should pass', (text) => {
    expect(isValidEmail(text)).toBe(true)
  })
  it.each([
    'some text',
    'some@ text.foo',
    'abc@ab=c.abc',
    'abc@@def.foo',
    'adavfd@davdf',
    'av.asf.vas',
  ])('should', (text) => {
    expect(isValidEmail(text)).toBe(false)
  })
})
