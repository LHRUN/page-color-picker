import { FC, useMemo, useRef } from 'react'
import { ColorPicker } from '@/utils/colorPicker'

const Home: FC = () => {
  const scopeContainer = useRef<HTMLDivElement>(null)

  const colorChange = (color: string) => {
    console.log(color)
  }
  const colorPicker = useMemo(() => {
    // if (scopeContainer.current) {
    // return new ColorPicker(colorChange, scopeContainer.current)
    return new ColorPicker(colorChange)
    // }
  }, [scopeContainer.current])
  const picker = () => {
    // if (colorPicker) {
    colorPicker.initCanvas()
    // }
  }

  return (
    <>
      <div ref={scopeContainer}>
        {/* <img src="/color_select.jpg" width="500px" alt="" /> */}
        <button onClick={picker}>Picker</button>
      </div>
    </>
  )
}

export default Home
