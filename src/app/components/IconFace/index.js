import React from 'react'
import styled from 'styled-components'
import { border, buttons } from '../../config/theme'

const IconFace = () => (
  <Wrapper>
    <span role='img' aria-label='face'>
      😀
    </span>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 35px;
  height: 35px;
  font-size: 28px;
  cursor: pointer;
  ${border()};
  ${buttons()};
`


export default IconFace
