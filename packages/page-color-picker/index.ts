import { createDocument, getId, toHexString } from './utils/tools'
import html2canvas from 'html2canvas'
import { styleObj } from './utils/constant'

const COLOR_ITEM_SIZE = 11

export class ColorPicker {
  canvasContainer: HTMLDivElement | null = null // canvas容器元素
  canvas: HTMLCanvasElement | null = null // 截屏canvas
  context: CanvasRenderingContext2D | null = null // 截屏canvas[context]
  floatContainer: HTMLDivElement | null = null // 鼠标移动时的浮动容器元素
  onChange?: (color: string) => void // 点击鼠标后的回调
  color = '' // 颜色值
  elementId = '' // 元素唯一id
  colorArr: {
    el: HTMLDivElement
    row: number
    col: number
  }[] = [] // 放大镜颜色数组

  constructor(
    onChange?: (color: string) => void // 点击后回调
  ) {
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
    this.canvasContainer = canvasContainer
    return canvasContainer
  }

  /**
   * 开启取色器
   */
  open() {
    this.elementId = getId()
    this.initContainer()
    html2canvas(document.body).then((canvas) => {
      if (canvas && this.canvasContainer) {
        this.initEvent(canvas)
        this.canvasContainer.style.display = 'block'
        this.canvasContainer.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.initFloatContainer()
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
      // 获取放大镜所需区域颜色
      const colors = this.getColors(x, y)
      if (this.floatContainer && colors) {
        // 根据坐标改变放大镜位置
        this.floatContainer.style.transform = `translate(${e.pageX - 82.5}px, ${
          e.pageY - 82.5
        }px )`
        if (this.floatContainer.style.display === 'none') {
          this.floatContainer.style.display = 'flex'
        }
        const textEl = document.getElementById(`${this.elementId}text`)
        // 遍历每个颜色块，修改颜色
        for (
          let i = 0, size = COLOR_ITEM_SIZE * COLOR_ITEM_SIZE;
          i < size;
          i++
        ) {
          const { el, row, col } = this.colorArr[i]
          const [r, g, b, a] = colors[i]
          // toHexString rgba转16进制
          const hexStr = toHexString({ r, g, b, a: a / 255 })

          //  最中间的颜色保存起来
          if (row === 6 && col === 6 && textEl) {
            textEl.textContent = hexStr
            textEl.style.color = hexStr
            this.color = hexStr
          }

          el.style.backgroundColor = hexStr
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
   * 获取放大镜所需区域颜色
   * @param x
   * @param y
   * @returns
   */
  getColors(x: number, y: number) {
    if (this.context) {
      const { data } = this.context.getImageData(
        x - 5,
        y - 5,
        COLOR_ITEM_SIZE,
        COLOR_ITEM_SIZE
      )
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
   * 初始化浮动元素容器
   */
  initFloatContainer() {
    if (this.canvasContainer) {
      // 创建浮动元素容器
      const floatContainer = createDocument(
        'div',
        styleObj.floatContainer,
        this.canvasContainer
      )

      // 创建放大镜的小颜色块
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
        this.colorArr.push({
          el: itemEl,
          row,
          col
        })
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
