import { createDocument, getId, toHexString } from './utils/tools'
import html2canvas from 'html2canvas'
import { styleObj } from './utils/constant'

const COLOR_ITEM_SIZE = 11

export class ColorPicker {
  canvasContainer: HTMLDivElement | null = null // canvas容器元素
  canvas: HTMLCanvasElement | null = null // canvas实例
  context: CanvasRenderingContext2D | null = null
  floatContainer: HTMLDivElement | null = null // 鼠标移动时的浮动容器元素
  onChange?: (color: string) => void // 点击鼠标后的回调
  color = '' // 颜色值
  elementId = '' // 唯一id

  constructor(
    onChange?: (color: string) => void // 点击后回调
  ) {
    this.onChange = onChange
    this.elementId = getId()
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
    this.canvasContainer = canvasContainer
    return canvasContainer
  }

  /**
   * 初始化canvas
   */
  initCanvas() {
    this.initContainer()
    html2canvas(document.body).then((canvas) => {
      if (canvas && this.canvasContainer) {
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
      const x = e.pageX * window.devicePixelRatio
      const y = e.pageY * window.devicePixelRatio
      const colors = this.getColors(x, y)
      if (this.floatContainer && colors) {
        this.floatContainer.style.transform = `translate(${e.pageX - 82.5}px, ${
          e.pageY - 82.5
        }px )`
        if (this.floatContainer.style.display === 'none') {
          this.floatContainer.style.display = 'flex'
        }
        const textEl = document.getElementById(`${this.elementId}text`)
        for (
          let i = 1, size = COLOR_ITEM_SIZE * COLOR_ITEM_SIZE;
          i <= size;
          i++
        ) {
          const itemEl = document.getElementById(`${this.elementId}${i}`)
          const [r, g, b, a] = colors[i - 1]
          const hexStr = toHexString({ r, g, b, a: a / 255 })
          const row = Math.ceil(i / COLOR_ITEM_SIZE)
          const col = i - (row - 1) * COLOR_ITEM_SIZE

          if (row === 6 && col === 6 && textEl) {
            textEl.textContent = hexStr
            textEl.style.color = hexStr
            this.color = hexStr
          }

          if (itemEl) {
            itemEl.style.backgroundColor = hexStr
          }
        }
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
  getColors(x: number, y: number) {
    if (this.context) {
      const { data } = this.context.getImageData(x - 5, y - 5, 11, 11)
      const colors = []
      for (let i = 0; i < data.length; i += 4) {
        colors.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
      }
      return colors
    }
  }

  /**
   * esc按键监听
   * @param e
   */
  onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.destroy()
    }
  }

  /**
   * 展示浮动元素容器
   */
  showFloatCOntainer() {
    if (this.canvasContainer) {
      const floatContainer = createDocument(
        'div',
        styleObj.floatContainer,
        this.canvasContainer
      )
      const fragment = document.createDocumentFragment()
      for (let i = 1; i <= COLOR_ITEM_SIZE * COLOR_ITEM_SIZE; i++) {
        const row = Math.ceil(i / COLOR_ITEM_SIZE)
        const col = i - (row - 1) * COLOR_ITEM_SIZE
        const style: Record<string, string | number> = {
          ...styleObj.colorItem
        }

        if (row === 6 && col === 6) {
          style.borderColor = '#000000'
        }
        const itemEl = createDocument('div', style, fragment)
        itemEl.setAttribute('id', `${this.elementId}${i}`)
      }
      floatContainer.appendChild(fragment)
      const textEl = createDocument('div', styleObj.text, floatContainer)
      textEl.setAttribute('id', `${this.elementId}text`)
      floatContainer.addEventListener('mousemove', this.canvasMouseMove)
      floatContainer.addEventListener('mousedown', this.canvasMouseDown)
      this.floatContainer = floatContainer
    }
  }

  /**
   * 结束销毁
   */
  destroy() {
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.canvasMouseMove)
      this.canvas.removeEventListener('mousedown', this.canvasMouseDown)
    }
    if (this.floatContainer) {
      this.floatContainer.removeEventListener('mousemove', this.canvasMouseMove)
      this.floatContainer.removeEventListener('mousedown', this.canvasMouseDown)
    }
    if (this.canvasContainer) {
      document.body.removeChild(this.canvasContainer)
    }
    window.removeEventListener('keydown', this.onKeyDown)
  }
}
