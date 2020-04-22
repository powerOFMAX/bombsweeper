import React, { useState } from 'react'
import { Wrapper } from './components/styled'
import { Body } from '../../components/Body'
import { Header } from '../../components/Header'
import { Display } from '../../components/Display'
import IconFace from '../../components/IconFace'
import { generateCells, NUMBER_OF_BOMBS } from '../../utils/index'

export const Game = () => {
  const [cells, setCells] = useState(generateCells())
  const [live, setLive] = useState(false)
  const [bombCounter, setBombCounter] = useState(NUMBER_OF_BOMBS)
  const [hasLost, setHasLost] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  const handleFaceClick = () => {
    setLive(false)
    setHasLost(false)
    setHasWon(false)
    setCells(generateCells())
    setBombCounter(NUMBER_OF_BOMBS)
  }

  return (
    <Wrapper>
      <Header>
        <Display
          value={bombCounter}
        />
        <IconFace
          hasLost={hasLost}
          hasWon={hasWon}
          onClick={handleFaceClick}
        />
        <Display
          isLive={live}
          hasLost={hasLost}
          hasWon={hasWon}
        />
      </Header>
      <Body
        live={live}
        setLive={(value) => setLive(value)}
        setHasLost={(value) => setHasLost(value)}
        setBombCounter={(value) => setBombCounter(value)}
        bombCounter={bombCounter}
        cells={cells}
        setHasWon={(value) => setHasWon(value)}
        setCells={(value) => setCells(value)}
      />
    </Wrapper>
  )
}

export default Game
