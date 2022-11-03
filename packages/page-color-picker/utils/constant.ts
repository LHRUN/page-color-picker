// 样式对象，用于创建元素使用
export const styleObj = {
  // canvas容器
  canvasContainer: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    zIndex: 999,
    display: 'none',
    cursor: 'point'
  },
  // 浮动容器
  floatContainer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '165px',
    height: '195px',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'none',
    flexWrap: 'wrap'
  },
  // 放大镜样式块
  colorItem: {
    width: '15px',
    height: '15px',
    border: 'solid 1px rgba(0,0,0,0.2)',
    boxSizing: 'border-box'
  },
  // 放大镜文本元素
  text: {
    width: '165px',
    height: '30px',
    color: '#000000',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontWeight: 'bold'
  }
}
