import { createDocument, toHexString } from './tools'
import html2canvas from 'html2canvas'
import { styleObj } from './constant'

const COLOR_ROWS = 11
const COLOR_COLUMNS = 11

export class ColorPicker {
  scopeContainer: HTMLElement // 选择范围元素
  canvasContainer: HTMLDivElement // canvas容器元素
  canvas: HTMLCanvasElement | null = null // canvas实例
  context: CanvasRenderingContext2D | null = null
  floatContainer: HTMLDivElement | null = null // 鼠标移动时的浮动容器元素
  onChange?: (color: string) => void // 点击鼠标后的回调
  color = '' // 颜色值

  constructor(
    onChange?: (color: string) => void,
    scopeContainer: HTMLElement = document.body
  ) {
    const canvasContainer = this.initContainer(scopeContainer)
    this.scopeContainer = scopeContainer
    this.canvasContainer = canvasContainer
    this.onChange = onChange
  }

  /**
   * 初始化canvas容器
   * @returns canvas容器
   */
  initContainer(scopeContainer: HTMLElement) {
    const rect = scopeContainer.getBoundingClientRect()
    const style = {
      ...styleObj.canvasContainer,
      width: rect.width,
      height: rect.height,
      top: `${rect.top}px`,
      left: `${rect.left}px`
    }
    const canvasContainer = createDocument('div', style, scopeContainer)
    return canvasContainer
  }

  /**
   * 初始化canvas
   */
  initCanvas() {
    html2canvas(this.scopeContainer).then((canvas) => {
      console.log(canvas)
      if (canvas) {
        this.initEvent(canvas)
        this.canvasContainer.style.display = 'block'
        this.canvasContainer.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.showFloatCOntainer()
      }
    })
  }

  /**
   * 初始化事件
   * @param canvas
   */
  initEvent(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousemove', this.canvasMouseMove)
    canvas.addEventListener('mousedown', this.canvasMouseDown)
    window.addEventListener('keydown', this.onKeyDown)
  }

  /**
   * canvas移动事件
   * @param e
   */
  canvasMouseMove = (e: MouseEvent) => {
    if (this.context) {
      const { pageX: x, pageY: y } = e
      const hexStr = this.getColorHex(x, y)
      if (this.floatContainer && hexStr) {
        this.floatContainer.style.transform = `translate(${x + 10}px, ${
          y + 10
        }px )`
        const textEl = document.getElementById('colorText')
        if (textEl && hexStr) {
          textEl.textContent = hexStr
          textEl.style.backgroundColor = hexStr
        }
        for (let i = 1; i <= COLOR_ROWS * COLOR_COLUMNS; i++) {
          const itemEl = document.getElementById(`color${i}`)

          const row = Math.ceil(i / COLOR_COLUMNS)
          const col = i - (row - 1) * COLOR_COLUMNS
          const itemX = row - 6 + x
          const itemY = col - 6 + y
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
   * 监听鼠标按下
   */
  canvasMouseDown = () => {
    this?.onChange?.(this.color)
    this.destroy()
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
      const a = data[3] / 255
      const hexStr = toHexString({ r, g, b, a })
      return hexStr
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.destroy()
    }
  }

  showFloatCOntainer() {
    const floatContainer = createDocument(
      'div',
      styleObj.floatContainer,
      this.canvasContainer
    )
    const fragment = document.createDocumentFragment()
    for (let i = 1; i <= COLOR_ROWS * COLOR_COLUMNS; i++) {
      const row = Math.ceil(i / COLOR_COLUMNS)
      const col = i - (row - 1) * COLOR_COLUMNS
      const style: Record<string, string | number> = {
        ...styleObj.colorItem
      }

      if (row === 6 && col === 6) {
        style['grid-column'] = '5 / span 3'
        style['grid-row'] = '5 / span 3'
        console.log('mark', style)
      }
      const itemEl = createDocument('div', styleObj.colorItem, fragment)
      itemEl.textContent = `${i}`
      itemEl.setAttribute('id', `color${i}`)
    }
    floatContainer.appendChild(fragment)
    const textEl = createDocument('div', styleObj.text, floatContainer)
    textEl.setAttribute('id', `colorText`)
    this.floatContainer = floatContainer
  }

  destroy() {
    document.body.removeChild(this.canvasContainer)
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.canvasMouseMove)
      this.canvas.removeEventListener('mousedown', this.canvasMouseDown)
    }
    window.removeEventListener('keydown', this.onKeyDown)
  }
}
