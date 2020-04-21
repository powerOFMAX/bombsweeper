import React from 'react'
import { Wrapper } from './components/styled'
import Button from '../Button'

export const Body = ({ cells, onClick, onContext }) => (
  <Wrapper>
    {cells.map((row, rowIndex) => row.map((col, colIndex) => (
      <Button
        key={`${rowIndex}-${colIndex}`}
        row={rowIndex}
        col={colIndex}
        state={col.state}
        value={col.value}
        onClick={onClick}
        onContext={onContext}
      />
    )))}
  </Wrapper>
)

export default Body
