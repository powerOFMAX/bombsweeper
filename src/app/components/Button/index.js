import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './styled'
import { CellState, CellValue } from '../../utils'

const Button = ({ row, col, state, value, onClick, onContext }) => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span role='img' aria-label='bomb'>💣</span>
      }
      if (value === CellValue.none) return null

      return value
    } if (state === CellState.flag) {
      return <span role='img' aria-label='flag'>🚩</span>
    }
    return null
  }

  return (
    <Wrapper
      onClick={() => onClick(row, col)}
      isVisible={state === CellState.visible}
      className={`value-${value}`}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </Wrapper>
  )
}

Button.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  state: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func.isRequired,
  onContext: PropTypes.func.isRequired
}

export default Button
