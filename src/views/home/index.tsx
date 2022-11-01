import { FC } from 'react'
import { ColorPicker } from '@/utils/colorPicker'

const Home: FC = () => {
  const colorChange = (color: string) => {
    console.log(color)
  }
  const color = new ColorPicker(colorChange)
  const picker = () => {
    color.initCanvas()
  }

  return (
    <>
      <button onClick={picker}>Picker</button>
    </>
  )
}

export default Home
