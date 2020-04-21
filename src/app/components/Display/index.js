import React from 'react'
import styled from 'styled-components'

export const Display = ({ value }) => (
  <Wrapper>
    {value.toString().padStart(3, '0')}
  </Wrapper>
)

const Wrapper = styled.div`
  width: 80px;
  height: 35px;
  color: #ff0701;
  background: black;
  text-align: center;
  font-size: 30px;
`

export default Display
