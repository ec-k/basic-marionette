import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TransformSettingWindw from "./TransformSettingWindow"
import networkHandler from "../models/NetworkHandler";
import { Vector3, Quaternion } from 'three'
import styled from '@emotion/styled'

const Div = styled.div`
    padding: 50px 0 0 20px;
    width: 20%;
    border-left: 1px solid #121212;
`

const RightWindow: React.FC = () => {
    function syncTransform() {
        const pos = new Vector3() // Cubeの値から取得するようにする
        const rot = new Quaternion() // Cubeの価から取得するようにする
        networkHandler.sendPosRot(pos, rot)
    }

    return <Div>
        <Stack spacing={10}>
            <Button variant="outlined">Load FBX</Button>
            <TransformSettingWindw />
            <Stack spacing={2} direction="row">
                <Button onClick={syncTransform} variant="outlined">
                    <WifiIcon />
                </Button>
                <Button variant="outlined">
                    <RestartAltIcon />
                </Button>
            </Stack>
        </Stack>
    </Div>
}

export default RightWindow