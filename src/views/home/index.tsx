import { FC } from 'react'
import { ColorPicker } from '@/utils/colorPicker'

const Home: FC = () => {
  const color = new ColorPicker()

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
