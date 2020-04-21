import React, { useState } from 'react'
import { Wrapper } from './components/styled'
import { Body } from '../../components/Body'
import { Header } from '../../components/Header'
import { Display } from '../../components/Display'
import IconFace from '../../components/IconFace'

import { generateCells } from '../../utils/index'

export const Game = () => {
  const [cells, setCells] = useState(generateCells())

  console.log(cells)

  return (
    <Wrapper>
      <Header>
        <Display value='000' />
        <IconFace />
        <Display value='23' />
      </Header>
      <Body cells={cells} />
    </Wrapper>
  )
}

export default Game
