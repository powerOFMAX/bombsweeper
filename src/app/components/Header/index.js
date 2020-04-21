import React from 'react'
import styled from 'styled-components'
import { border } from '../../config/theme'

export const Header = (props) => (
  <Wrapper>
    {props.children}
  </Wrapper>
)

const Wrapper = styled.div`
  background: #c0c0c0;
  padding: 10px 12px;
  ${border('#7b7b7b', 'white')};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`

export default Header
