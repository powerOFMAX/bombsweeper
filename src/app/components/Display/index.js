import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Display = ({ value, isLive }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (isLive && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
    return setTime(0)
  }, [isLive, time])

  function renderDisplay() {
    if (value) {
      return value < 0
        ? `-${Math.abs(value).toString().padStart(2, '0')}`
        : value.toString().padStart(3, '0')
    }
    return time.toString().padStart(3, '0')
  }

  return (
    <Wrapper>
      {renderDisplay()}
    </Wrapper>
  )
}

Display.propTypes = {
  value: PropTypes.number,
  isLive: PropTypes.bool
}

const Wrapper = styled.div`
  width: 80px;
  height: 35px;
  color: ${(props) => props.theme.colors.displayRed};
  background: black;
  text-align: center;
  font-size: 30px;
`

export default Display
