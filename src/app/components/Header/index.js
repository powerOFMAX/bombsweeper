import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { border } from '../../config/theme'

export const Header = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)

Header.propTypes = {
  children: PropTypes.any
}

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.grayBackground};
  padding: 10px 12px;
  ${border((props) => props.theme.colors.gray, 'white')};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`

export default Header
