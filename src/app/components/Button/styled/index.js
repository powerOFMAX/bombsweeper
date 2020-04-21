import styled from 'styled-components'
import { border, buttons } from '../../../config/theme'

export const Wrapper = styled.div`
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
    border-color: ${(props) => props.theme.colors.gray};
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
