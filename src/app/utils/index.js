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

  return cells
}
