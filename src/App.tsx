import React from 'react';
import logo from './logo.svg';
import './App.css';
import RightWindow from "./components/RightWindow";
import MainScene from './components/MainScene';
import { Stack } from '@mui/material'
import styled from '@emotion/styled'

const Div = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction: row;
`

function App() {
  return (
    <Div className="App">
      <Stack direction="row">
        <MainScene />
        <RightWindow />
      </Stack>
    </Div>
  );
}

export default App;
