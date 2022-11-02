export const styleObj = {
  canvasContainer: {
    position: 'fixed',
    zIndex: 999,
    display: 'none',
    cursor: 'point'
  },
  floatContainer: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '165px',
    height: '195px',
    display: 'grid',
    gridTemplateColumns: 'repeat(11, 15px)',
    gridTemplateRows: 'repeat(11, 15px)',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  colorItem: {
    border: 'solid 1px rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    width: '15px',
    height: '15px'
  },
  text: {
    width: '100px',
    height: '30px',
    color: '#000000',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    fontWeight: 'bold'
  }
}
