import { useState, useRef, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import { Sprite, useTick } from '@inlet/react-pixi'

function Bunny (props: any) {
  return <Sprite image={logo} {...props} />;
}

function App() {
  const [speed, setSpeed] = useState<number>(4)
  const [jumpMaxDistance, setJumpMaxDistance] = useState<number>(40)
  const [rotation, setRotation] = useState<number>(2.3)
  const [yPosition, setYPosition] = useState<number>(340)
  const [xPosition, setXPosition] = useState<number>(200)

  const yRef = useRef(yPosition)
  const xRef = useRef(xPosition)
  const moveDurationRef = useRef(0)
  const currentDistance = useRef(0)
  const keyEvent = useRef<{[key: string]: boolean}>({})

  const updateYPosition = (yNext: number) => {
    yRef.current = yNext
    setYPosition(yNext)
  }

  const updateXPosition = (xNext: number) => {
    xRef.current = xNext
    setXPosition(xNext)
  }

  useEffect(() => {
    document.onkeydown = keyDownListener
    document.onkeyup = keyUpListener
    return function cleanup () {
      document.removeEventListener('keydown', keyDownListener)
      document.removeEventListener('keyup', keyUpListener)
    }
  }, [])

  const keyUpListener = (event: any) => {
    delete keyEvent.current[event.key]
  }

  const keyDownListener = (event: any) => {
    keyEvent.current[event.key] = true

    moveDurationRef.current++
  }

  const jump = () => {
    const goUp = () => {
      if (jumpMaxDistance === currentDistance.current) {
        goDown()
        return
      }
      moveUp()
      currentDistance.current++
      setTimeout(() => {goUp()}, 4)
    }

    const goDown = () => {
      if (currentDistance.current === 0) {
        return
      }
      moveDown()
      currentDistance.current--
      setTimeout(() => {goDown()}, 4)
    }

    goUp()
  }

  const moveDown = () => {
    updateYPosition(yRef.current + speed)
  }

  const moveUp = () => {
    updateYPosition(yRef.current - speed)
  }

  const moveLeft = () => {
    updateXPosition(xRef.current - speed)
  }

  const moveRight = () => {
    updateXPosition(xRef.current + speed)
  }

  useTick(() => {
    setRotation(rotation + 0.01)

    if (keyEvent.current['w']) {
      if (currentDistance.current === 0) {
        jump()
      }
    }

    if (keyEvent.current['a']) {
      moveLeft()
    }

    if (keyEvent.current['d']) {
      moveRight()
    }
  })

  return (
    <Bunny position={{ x: xPosition, y: yPosition }} anchor={{ x: 0.5, y: 0.5 }} rotation={rotation} />
  )
}

export default App
