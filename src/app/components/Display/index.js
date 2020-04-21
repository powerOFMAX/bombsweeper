import React, { useState, useEffect } from 'react'
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
    setTime(0)
  }, [isLive, time])

  return (
    <Wrapper>
      {value
        ? (value < 0
          ? `-${Math.abs(value).toString().padStart(2, '0')}`
          : value.toString().padStart(3, '0'))
        : time.toString().padStart(3, '0')}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80px;
  height: 35px;
  color: #ff0701;
  background: black;
  text-align: center;
  font-size: 30px;
`

export default Display
