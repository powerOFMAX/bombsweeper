import { css } from 'styled-components'

export const border = (leftTop = 'white', rightBottom = '#7b7b7b') => css`
  border-width: 4px;
  border-style: solid;
  border-right-color: ${rightBottom};
  border-bottom-color: ${rightBottom};
  border-left-color: ${leftTop};
  border-top-color: ${leftTop};
`

export const buttons = () => css`
  &:active {
    border-right-color: white;
    border-bottom-color: white;
    border-left-color: #7b7b7b;
    border-top-color: #7b7b7b;
  }
`

export const theme = {
  colors: {
  }
}
