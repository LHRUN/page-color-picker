import { FC, useState } from 'react'
import { ColorPicker } from 'page-color-picker'

import classes from './index.module.css'
let colorKey = 1
const Home: FC = () => {
  const [colors, setColors] = useState<
    {
      color: string
      key: number
    }[]
  >([])

  const colorChange = (color: string) => {
    const newColors = [
      {
        color,
        key: ++colorKey
      },
      ...colors
    ]
    setColors(newColors.slice(0, 5))
  }

  const colorPicker = new ColorPicker(colorChange)
  const picker = () => {
    if (colorPicker) {
      colorPicker.open()
    }
  }

  const copyColor = (color: string) => {
    alert(color)
  }

  return (
    <div className={classes.conintaer}>
      <img src="/color_select.jpg" width="500px" alt="" />
      <div className={classes.right}>
        <button onClick={picker}>Picker</button>
        {colors.map(({ color, key }) => (
          <div
            key={key}
            className={classes.colorItem}
            style={{ backgroundColor: color }}
            onClick={() => copyColor(color)}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
