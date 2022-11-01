import { IColorObj } from './types'

/**
 * 判断key是否存在于object
 * @param key
 * @param object
 * @returns boolean
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

export const toHex = (n: number) => `${n > 15 ? '' : 0}${n.toString(16)}`

export const toHexString = (colorObj: IColorObj) => {
  const { r, g, b, a = 1 } = colorObj
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${
    a === 1 ? '' : toHex(Math.floor(a * 255))
  }`
}

export const createDocument = <T extends keyof HTMLElementTagNameMap>(
  elType: T,
  styleObj: Record<string, string | number>,
  parent: HTMLElement | DocumentFragment
): HTMLElementTagNameMap[T] => {
  const containerEl = document.createElement(elType)
  Object.keys(styleObj).forEach((key) => {
    if (isValidKey(key, styleObj)) {
      Reflect.set(containerEl.style, key, styleObj[key])
    }
  })
  parent.appendChild(containerEl)
  return containerEl
}
