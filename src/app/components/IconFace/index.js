import React from 'react'
import styled from 'styled-components'
import { border, buttons } from '../../config/theme'

const Faces = {
  smile: '😀',
  surprised: '😮',
  dead: '😵',
  win: '😎'
}

const IconFace = ({ onClick }) => (
  <Wrapper onClick={() => onClick()}>
    <span role='img' aria-label='face'>
      {Faces.smile}
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
