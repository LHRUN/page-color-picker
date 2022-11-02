import { FC, useMemo, useState } from 'react'
import { ColorPicker } from '@/utils/colorPicker'

import classes from './index.module.css'
let colorKey = 1
const Home: FC = () => {
  const [colors, setColors] = useState<
    {
      color: string
      key: number
    }[]
  >([])
  const [scopeContainer, setScopeContainer] = useState<HTMLDivElement | null>(
    null
  )

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

  // const colorPicker = useMemo(() => {
  //   if (scopeContainer) {
  //     return new ColorPicker(colorChange)
  //   }
  // }, [scopeContainer])
  const colorPicker = new ColorPicker(colorChange)
  const picker = () => {
    if (colorPicker) {
      colorPicker.initCanvas()
    }
  }

  return (
    <div className={classes.conintaer} ref={setScopeContainer}>
      <img src="/color_select.jpg" width="500px" alt="" />
      <div className={classes.right}>
        <button onClick={picker}>Picker</button>
        {colors.map(({ color, key }) => (
          <div
            key={key}
            className={classes.colorItem}
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
