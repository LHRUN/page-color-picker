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

export const toHex = (n: number) => `0${n.toString(16)}`.slice(-2)

/**
 * rgba转16进制
 * @param colorObj
 * @returns
 */
export const toHexString = (colorObj: IColorObj) => {
  let { r, g, b } = colorObj
  const { a } = colorObj
  r = Math.floor(r * a)
  g = Math.floor(g * a)
  b = Math.floor(b * a)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 创建元素
 * @param elType 元素类型
 * @param styleObj 样式对象
 * @param parent 父级元素
 * @returns element
 */
export const createDocument = <T extends keyof HTMLElementTagNameMap>(
  elType: T,
  styleObj: Record<string, string | number>,
  parent: HTMLElement | DocumentFragment
): HTMLElementTagNameMap[T] => {
  const el = document.createElement(elType)
  Object.keys(styleObj).forEach((key) => {
    if (isValidKey(key, styleObj)) {
      Reflect.set(el.style, key, styleObj[key])
    }
  })
  parent.appendChild(el)
  return el
}
