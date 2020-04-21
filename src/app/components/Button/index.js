import React from 'react'
import styled from 'styled-components'
import { border, buttons } from '../../config/theme'
import { CellState, CellValue } from '../../utils'

const Button = ({ row, col, state, value }) => {
  const renderContent = () => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <span role='img' aria-label='bomb'>💣</span>
      }
    } else if (state === CellState.flag) {
      return <span role='img' aria-label='flag'>🚩</span>
    }
    return null
  }

  return (
    <Wrapper isVisible={state === CellState.visible}>
      {renderContent()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${border()};
  ${buttons()};
  width: 30px;
  height: 30px;

  ${(props) => props.isVisible && `
    border-color: #7b7b7b;
    border-width: 1px;
    // margin-left: 3px;
  `};
  span {
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
`

export default Button
