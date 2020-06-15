import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './components/styled'
import Button from '../Button'
import {
  CellValue,
  CellState,
  makeCellsVisible,
  setFlagsToBoard,
  checkIfHasSafeCells,
  generateCells
} from '../../utils'

export const Body = ({
  cells,
  setCells,
  live,
  setLive,
  setHasLost,
  bombCounter,
  setBombCounter,
  setHasWon
}) => {
  const showAllBombs = () => {
    const currentCells = cells.slice()
    return currentCells.map((row) => row.map((cell) => {
      if (cell.value === CellValue.bomb) {
        return { ...cell, state: CellState.visible }
      }
      return cell
    }))
  }

  const handleClick = (row, col) => {
    let newCells = cells.slice()

    // We don't click on a bomb in the beginning
    if (!live) {
      let isABomb = newCells[row][col].value === CellValue.bomb
      while (isABomb) {
        newCells = generateCells()
        if (newCells[row][col].value !== CellValue.bomb) {
          isABomb = false
          break
        }
      }
      setLive(true)
    }

    const currentCell = newCells[row][col]

    // If we click on a flag don't do anything
    if ([CellState.flag, CellState.visible].includes(currentCell.state)) return

    // If I click a bomb then we lose
    if (currentCell.value === CellValue.bomb) {
      newCells[row][col].red = true
      newCells = showAllBombs()
      setHasLost(true)
      setLive(false)
      setCells(newCells)
      return
    }

    // If we click a blank cell
    if (currentCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row, col)
    } else {
      newCells[row][col].state = CellState.visible
    }

    // Check if I won
    if (!checkIfHasSafeCells(newCells)) {
      newCells = setFlagsToBoard(newCells)
      setHasWon(true)
    }

    setCells(newCells)
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
      {cells.map((row, rowIndex) => row.map((col, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={col.state}
          value={col.value}
          onClick={handleClick}
          onContext={handleRightClick}
          isRed={col.red ? col.red : null}
        />
      )))}
    </Wrapper>
  )
}

Body.propTypes = {
  cells: PropTypes.array,
  setHasLost: PropTypes.func,
  bombCounter: PropTypes.number,
  setBombCounter: PropTypes.func,
  setCells: PropTypes.func,
  live: PropTypes.bool,
  setLive: PropTypes.func,
  setHasWon: PropTypes.func
}

export default Body
