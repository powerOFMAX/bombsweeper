const MAX_ROW = 9
const MAX_COL = 9

const NUMBER_OF_BOMBS = 10

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
      const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null
      const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null
      const topRightBomb = rowIndex > 0 && colIndex < MAX_COL - 1 ? cells[rowIndex - 1][colIndex + 1] : null
      const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null
      const rightBomb = colIndex < MAX_COL - 1 ? cells[rowIndex][colIndex + 1] : null
      const bottomLeftBomb = rowIndex < MAX_ROW - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null
      const bottomBomb = rowIndex < MAX_ROW - 1 ? cells[rowIndex + 1][colIndex] : null
      const bottomRightBomb = rowIndex < MAX_ROW - 1 && colIndex < MAX_COL - 1 ? cells[rowIndex + 1][colIndex + 1] : null

      if (topLeftBomb && topLeftBomb.value === CellValue.bomb) numberOfBombs += 1
      if (topBomb && topBomb.value === CellValue.bomb) numberOfBombs += 1
      if (topRightBomb && topRightBomb.value === CellValue.bomb) numberOfBombs += 1
      if (leftBomb && leftBomb.value === CellValue.bomb) numberOfBombs += 1
      if (rightBomb && rightBomb.value === CellValue.bomb) numberOfBombs += 1
      if (bottomLeftBomb && bottomLeftBomb.value === CellValue.bomb) numberOfBombs += 1
      if (bottomBomb && bottomBomb.value === CellValue.bomb) numberOfBombs += 1
      if (bottomRightBomb && bottomRightBomb.value === CellValue.bomb) numberOfBombs += 1

      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = { ...currentCell, value: numberOfBombs }
      }
    }
  }


  return cells
}
