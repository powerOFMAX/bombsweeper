import React from 'react'
import styled from 'styled-components'
import { border, buttons } from '../../config/theme'
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

const Wrapper = styled.div`
  ${border()};
  ${buttons()};
  font-family: Arial, Helvetica, sans-serif;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  ${(props) => props.isVisible && `
    border-color: #7b7b7b;
    border-width: 1px;
    // margin-left: 3px;
  `};

  span {
    font-size: 20px;
  }

  &.value-1 {
    color: blue;
  }
  &.value-2 {
    color: green;
  }
  &.value-3 {
    color: red;
  }
  &.value-4 {
    color: purple;
  }
  &.value-5 {
    color: maroon;
  }
  &.value-6 {
    color: turquoise;
  }
  &.value-7 {
    color: black;
  }
  &.value-8 {
    color: gray;
  }
`

export default Button
