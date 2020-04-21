import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from './config/theme'
import Game from './scenes/Game'

export const App = () => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Game />
    </Wrapper>
  </ThemeProvider>
)

const Wrapper = styled.div`
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App
