import { css } from 'styled-components'

export const theme = {
  colors: {
    gray: '#7b7b7b',
    grayBackground: '#c0c0c0',
    displayRed: '#ff0701'
  }
}

export const border = (leftTop = 'white', rightBottom = theme.colors.gray) => css`
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
    border-left-color: ${(props) => props.theme.colors.gray};
    border-top-color: ${(props) => props.theme.colors.gray};
  }
`
