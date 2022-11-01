import { createDocument, toHexString } from './tools'
import html2canvas from 'html2canvas'
import { styleObj } from './constant'

const COLOR_SIZE_MAX = 25

export class ColorPicker {
  canvasContainer: HTMLDivElement // canvas容器元素
  canvas: HTMLCanvasElement | null = null // canvas实例
  context: CanvasRenderingContext2D | null = null
  floatContainer: HTMLDivElement | null = null // 鼠标移动时的浮动容器元素
  onChange: (color: string) => void // 点击鼠标后的回调
  color = '' // 颜色值

  constructor(onChange: (color: string) => void) {
    const canvasContainer = this.initContainer()
    this.canvasContainer = canvasContainer
    this.onChange = onChange
  }

  /**
   * 初始化canvas容器
   * @returns canvas容器
   */
  initContainer() {
    const canvasContainer = createDocument(
      'div',
      styleObj.canvasContainer,
      document.body
    )
    return canvasContainer
  }

  /**
   * 初始化canvas
   */
  initCanvas() {
    html2canvas(document.body).then((canvas) => {
      if (canvas) {
        this.initEvent(canvas)
        this.canvasContainer.style.display = 'block'
        this.canvasContainer.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.initShowWrap()
      }
    })
  }

  /**
   * 初始化事件
   * @param canvas
   */
  initEvent(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', (e) => {
      this.canvasMouseMove(e)
    })
    canvas.addEventListener('mousedown', () => {
      this.onChange(this.color)
      this.destroy()
    })
    window.addEventListener('keydown', (e) => {
      this.onKeyDown(e)
    })
  }

  /**
   * canvas移动事件
   * @param e
   */
  canvasMouseMove(e: MouseEvent) {
    if (this.context) {
      const { pageX: x, pageY: y } = e
      const hexStr = this.getColorHex(x, y)
      if (this.floatContainer && hexStr) {
        this.floatContainer.style.top = `${y + 10}px`
        this.floatContainer.style.left = `${x + 10}px`
        const textEl = document.getElementById('canvasText')
        if (textEl) {
          textEl.textContent = hexStr
        }
        for (let i = 0; i < COLOR_SIZE_MAX; i++) {
          const itemEl = document.getElementById(`canvas${i}`)

          const row = Math.ceil(i / 5)
          const col = i - row * 5
          const itemX = row - 3 + x
          const itemY = col - 3 + y
          const itemColor = this.getColorHex(itemX, itemY)

          if (itemEl && itemColor) {
            itemEl.style.backgroundColor = itemColor
          }
        }
        this.color = hexStr
      }
    }
  }

  /**
   * 获取canvas颜色16进制
   * @param x
   * @param y
   * @returns
   */
  getColorHex(x: number, y: number) {
    if (this.context) {
      const { data } = this.context.getImageData(x, y, 1, 1)
      const r = data[0]
      const g = data[1]
      const b = data[2]
      const a = data[3]
      const hexStr = toHexString({ r, g, b, a })
      return hexStr
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.destroy()
    }
  }

  initShowWrap() {
    const floatContainer = createDocument(
      'div',
      styleObj.floatContainer,
      this.canvasContainer
    )
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < COLOR_SIZE_MAX; i++) {
      const itemEl = createDocument('div', styleObj.colorItem, fragment)
      itemEl.setAttribute('id', `canvas${i}`)
    }
    floatContainer.appendChild(fragment)
    const textEl = createDocument('div', styleObj.text, floatContainer)
    textEl.setAttribute('id', `canvasText`)
    this.floatContainer = floatContainer
  }

  destroy() {
    // document.body.removeChild(this.canvasContainer)
    // this.canvas?.removeEventListener('mousemove', this.canvasMouseMove)
    // window.removeEventListener('keydown', this.onKeyDown)
  }
}
