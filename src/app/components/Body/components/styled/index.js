import styled from 'styled-components'
import { border } from '../../../../config/theme'

export const Wrapper = styled.div`
  margin-top: 16px;
  ${border((props) => props.theme.colors.gray, 'white')};
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  align-items: center;
`
