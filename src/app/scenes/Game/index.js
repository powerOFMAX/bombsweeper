import React, { useState, useEffect } from 'react'
import { Wrapper } from './components/styled'
import { Body } from '../../components/Body'
import { Header } from '../../components/Header'
import { Display } from '../../components/Display'
import IconFace from '../../components/IconFace'
import { generateCells, CellValue, CellState } from '../../utils/index'

export const Game = () => {
  const [cells, setCells] = useState(generateCells())
  const [live, setLive] = useState(false)
  const [time, setTime] = useState(0)
  const [bombCounter, setBombCounter] = useState(10)

  console.log(cells)

  const handleClick = (row, col) => {
    if (!live) setLive(true)
  }

  const handleFaceClick = () => {
    if (live) {
      setLive(false)
      setTime(0)
      setCells(generateCells())
    }
  }

  const handleRightClick = (row, col) => (e) => {
    e.preventDefault()
    if (!live) return

    const currentCells = cells.slice()
    const currentCell = cells[row][col]

    // We don not need to do anything
    if (currentCell.state === CellState.visible) return

    // Add Flag
    if (currentCell.state === CellState.unpressed) {
      currentCells[row][col].state = CellState.flag
      setCells(currentCells)
      setBombCounter(bombCounter - 1)
      return
    }

    // If we already have a flag then remove it
    if (currentCell.state === CellState.flag) {
      currentCells[row][col].state = CellState.open
      setCells(currentCells)
      setBombCounter(bombCounter + 1)
    }
  }

  return (
    <Wrapper>
      <Header>
        <Display value={bombCounter} />
        <IconFace onClick={handleFaceClick} />
        <Display isLive={live} />
      </Header>
      <Body
        cells={cells}
        onContext={handleRightClick}
        onClick={handleClick}
      />
    </Wrapper>
  )
}

export default Game
