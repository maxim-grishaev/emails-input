export enum KeyCode {
  COMMA = 188,
  ENTER = 13,
}

export const isTriggerKeyCode = (keyCode: number) =>
  [KeyCode.COMMA, KeyCode.ENTER].some((code) => code == keyCode)
