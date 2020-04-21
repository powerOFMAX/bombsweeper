export const MAX_ROW = 9
export const MAX_COL = 9
export const NUMBER_OF_BOMBS = 10

export const CellValue = {
  none: 0,
  one: 1,
  two: 2,
  tree: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  bomb: 'bomb'
}

export const CellState = {
  unpressed: 0,
  visible: 1,
  flag: 2
}

/**
 * Check if the board has safe cells or not
 * @param {*} cells
 */
export const checkIfHasSafeCells = (cells) => {
  let safeCells = false
  for (let row = 0; row < MAX_ROW; row += 1) {
    for (let col = 0; col < MAX_COL; col += 1) {
      const currentCell = cells[row][col]
      if (currentCell.value !== CellValue.bomb && currentCell.state === CellState.unpressed) {
        safeCells = true
        break
      }
    }
  }

  return safeCells
}

/**
 * If no more cells available then set a flag on the cells
 * @param {*} cells
 */
export const setFlagsToBoard = (cells) => {
  cells = cells.map((row) => row.map((cell) => {
    if (cell.value === CellValue.bomb) {
      return { ...cell, state: CellState.flag }
    }
    return cell
  }))
  return cells
}

/**
 * Get as an object all the cells around one position
 *
 * @param {*} cells
 * @param {number} row
 * @param {number} column
 */
const getAllCellsAround = (cells, row, column) => {
  const topLeftCell = row > 0 && column > 0 ? cells[row - 1][column - 1] : null
  const topCell = row > 0 ? cells[row - 1][column] : null
  const topRightCell = row > 0 && column < MAX_COL - 1 ? cells[row - 1][column + 1] : null
  const leftCell = column > 0 ? cells[row][column - 1] : null
  const rightCell = column < MAX_COL - 1 ? cells[row][column + 1] : null
  const bottomLeftCell = row < MAX_ROW - 1 && column > 0 ? cells[row + 1][column - 1] : null
  const bottomCell = row < MAX_ROW - 1 ? cells[row + 1][column] : null
  const bottomRightCell = row < MAX_ROW - 1 && column < MAX_COL - 1 ? cells[row + 1][column + 1] : null

  return { topLeftCell, topCell, topRightCell, leftCell, rightCell, bottomLeftCell, bottomCell, bottomRightCell }
}

/**
 * Check if the cell Exists and is not a bomb
 * @param {*} cell
 */
const checkIfCellIsNotBomb = (cell) => cell && (cell.state === CellState.unpressed) && (cell.value !== CellValue.bomb)

/**
 * Check if the Cell has a flag
 * @param {*} cell
 */
const checkIfCellHasFlag = (cell) => (cell.state === CellState.visible) || (cell.state === CellState.flag)


/**
 *  Generate the cells / Place Bombs and calculate the bombs
 *  positions for each cell
 */
export const generateCells = () => {
  let cells = []

  for (let row = 0; row < MAX_ROW; row += 1) {
    cells.push([])
    for (let col = 0; col < MAX_COL; col += 1) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.unpressed
      })
    }
  }

  // Fill cells and generate put bombs
  let bombsPlaced = 0
  while (bombsPlaced < NUMBER_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROW)
    const randomCol = Math.floor(Math.random() * MAX_COL)
    const currentCell = cells[randomRow][randomCol]

    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) => row.map((col, colIndex) => {
        if (randomRow === rowIndex && randomCol === colIndex) {
          return { ...col, value: CellValue.bomb }
        }
        return col
      }))
      bombsPlaced += 1
    }
  }

  // Calculate Numbers
  for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex += 1) {
    for (let colIndex = 0; colIndex < MAX_COL; colIndex += 1) {
      const currentCell = cells[rowIndex][colIndex]
      // If the position has a bomb we don not need to do anything
      if (currentCell.value === CellValue.bomb) continue

      let numberOfBombs = 0
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
      } = getAllCellsAround(cells, rowIndex, colIndex)

      if (topLeftCell && topLeftCell.value === CellValue.bomb) numberOfBombs += 1
      if (topCell && topCell.value === CellValue.bomb) numberOfBombs += 1
      if (topRightCell && topRightCell.value === CellValue.bomb) numberOfBombs += 1
      if (leftCell && leftCell.value === CellValue.bomb) numberOfBombs += 1
      if (rightCell && rightCell.value === CellValue.bomb) numberOfBombs += 1
      if (bottomLeftCell && bottomLeftCell.value === CellValue.bomb) numberOfBombs += 1
      if (bottomCell && bottomCell.value === CellValue.bomb) numberOfBombs += 1
      if (bottomRightCell && bottomRightCell.value === CellValue.bomb) numberOfBombs += 1

      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = { ...currentCell, value: numberOfBombs }
      }
    }
  }

  return cells
}


/**
 *
 * I first make visible de position where I am clicking
 * then I grab all the cells around and check wich of them
 * can be visible
 *
 * @param {Array} cells
 * @param {Number} row
 * @param {Number} col
 */
export const makeCellsVisible = (cells, row, col) => {
  const currentCell = cells[row][col]

  // If the Cell has a flag then return
  if (checkIfCellHasFlag(currentCell)) return cells

  let newCells = cells.slice()
  newCells[row][col].state = CellState.visible

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  } = getAllCellsAround(cells, row, col)

  if (checkIfCellIsNotBomb(topLeftCell)) {
    if (topLeftCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row - 1, col - 1)
    } else {
      newCells[row - 1][col - 1].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(topCell)) {
    if (topCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row - 1, col)
    } else {
      newCells[row - 1][col].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(topRightCell)) {
    if (topRightCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row - 1, col + 1)
    } else {
      newCells[row - 1][col + 1].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(leftCell)) {
    if (leftCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row, col - 1)
    } else {
      newCells[row][col - 1].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(rightCell)) {
    if (rightCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row, col + 1)
    } else {
      newCells[row][col + 1].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(bottomLeftCell)) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row + 1, col - 1)
    } else {
      newCells[row + 1][col - 1].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(bottomCell)) {
    if (bottomCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row + 1, col)
    } else {
      newCells[row + 1][col].state = CellState.visible
    }
  }

  if (checkIfCellIsNotBomb(bottomRightCell)) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = makeCellsVisible(newCells, row + 1, col + 1)
    } else {
      newCells[row + 1][col + 1].state = CellState.visible
    }
  }

  return newCells
}
