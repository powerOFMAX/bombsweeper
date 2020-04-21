import React from 'react'
import PropTypes from 'prop-types'
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

Body.propTypes = {
  cells: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  onContext: PropTypes.func.isRequired
}

export default Body
