import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { border, buttons } from '../../config/theme'

const Faces = {
  smile: '😀',
  surprised: '😮',
  dead: '😵',
  win: '😎'
}

const IconFace = ({ onClick, hasLost, hasWon }) => {
  function returnFace() {
    if (hasWon) return Faces.win
    if (hasLost) return Faces.dead
    return Faces.smile
  }

  return (
    <Wrapper onClick={() => onClick()}>
      <span role='img' aria-label='face'>
        {returnFace()}
      </span>
    </Wrapper>
  )
}


IconFace.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasLost: PropTypes.bool,
  hasWon: PropTypes.bool
}

const Wrapper = styled.div`
  width: 35px;
  height: 35px;
  font-size: 28px;
  cursor: pointer;
  ${border()};
  ${buttons()};
`

export default IconFace
