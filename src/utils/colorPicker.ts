import { createContainerEl, toHexString } from './tools'
import html2canvas from 'html2canvas'

export class ColorPicker {
  canvasContainer: HTMLDivElement
  canvas: HTMLCanvasElement | null = null
  context: CanvasRenderingContext2D | null = null
  showWrapEl: HTMLDivElement | null = null

  constructor() {
    const canvasContainer = this.initContainer()
    this.canvasContainer = canvasContainer
  }

  initContainer() {
    const styleObj = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100vw',
      height: '100vh',
      ['z-index']: 999,
      display: 'none'
    }
    const canvasContainer = createContainerEl('div', styleObj, document.body)
    return canvasContainer
  }

  initCanvas() {
    html2canvas(document.body).then((canvas) => {
      if (canvas) {
        canvas.addEventListener('mousemove', this.canvasMouseMove)
        window.addEventListener('keydown', this.onKeyDown)
        this.canvasContainer.style.display = 'block'
        this.canvasContainer.appendChild(canvas)
        this.canvas = canvas
        this.context = canvas.getContext('2d')

        this.initShowWrap()
      }
    })
  }

  canvasMouseMove(e: MouseEvent) {
    if (this.context) {
      const { pageX: x, pageY: y } = e
      const { data } = this.context.getImageData(x, y, 1, 1)
      const r = data[0]
      const g = data[1]
      const b = data[2]
      const a = data[3]
      const hexStr = toHexString({ r, g, b, a })
      if (this.showWrapEl) {
        this.showWrapEl.style.top = `${y}px`
        this.showWrapEl.style.left = `${x}px`
        this.showWrapEl.textContent = hexStr
      }
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.destroy()
    }
  }

  initShowWrap() {
    const styleObj = {
      position: 'absolute',
      top: '0px',
      left: '0px'
    }
    const showContainer = createContainerEl(
      'div',
      styleObj,
      this.canvasContainer
    )
    this.showWrapEl = showContainer
  }

  destroy() {
    document.body.removeChild(this.canvasContainer)
    this.canvas?.removeEventListener('mousemove', this.canvasMouseMove)
    window.removeEventListener('keydown', this.onKeyDown)
  }
}
