import React from "react";
import { Stack, Button } from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TransformSettingWindw from "./TransformSettingWindow"
import networkHandler from "../models/NetworkHandler";
import styled from '@emotion/styled'
import { objectHandler } from "../stores/ObjectHandler";

const Div = styled.div`
    padding: 50px 20px 0 20px;
    width: 350px;
    border-left: 1px solid #121212;
`

const RightWindow: React.FC = () => {

    const syncTransform = () => {
        networkHandler.sendEnabled_ = !networkHandler.sendEnabled_
    }
    const loadFbx = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = URL.createObjectURL(event.target.files![0])
        objectHandler.setfbxObjectSrc(url)
        URL.revokeObjectURL(url)
    }
    const resetTransform = () => {
        if (!objectHandler.fbxObject) return
        if (!objectHandler.rest1pos || !objectHandler.rest1rot || !objectHandler.rest2pos || !objectHandler.rest2rot) return
        objectHandler.fbxObject.children[0].setRotationFromQuaternion(objectHandler.rest2rot)
        objectHandler.fbxObject.children[0].children[0].setRotationFromQuaternion(objectHandler.rest1rot)
    }

    return <Div>
        <Stack spacing={10}>
            <Button variant="outlined" component="label">
                Load FBX
                <input hidden accept=".fbx" type="file" onChange={loadFbx}></input>
            </Button>
            <TransformSettingWindw />
            <Stack spacing={2} direction="row">
                <Button onClick={syncTransform} variant="outlined">
                    <WifiIcon />
                </Button>
                <Button onClick={resetTransform} variant="outlined">
                    <RestartAltIcon />
                </Button>
            </Stack>
        </Stack>
    </Div>
}

export default RightWindow