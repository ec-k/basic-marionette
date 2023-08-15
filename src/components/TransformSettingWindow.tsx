import React from "react";
import { Box, Grid, TextField } from '@mui/material'
import { objectHandler } from "../stores/ObjectHandler";
import { IReactionDisposer, reaction } from "mobx";

const TransformSettingWindow: React.FC = () => {
    let object = objectHandler.fbxObject
    const [px, setPx] = React.useState<number>(0)
    const [py, setPy] = React.useState<number>(0)
    const [pz, setPz] = React.useState<number>(0)
    const [qx, setQx] = React.useState<number>(0)
    const [qy, setQy] = React.useState<number>(0)
    const [qz, setQz] = React.useState<number>(0)
    const [qw, setQw] = React.useState<number>(0)
    const reqIdRef = React.useRef<number>(0);

    function updateTransformDisplay() {
        if (!object) return
        setPx(object.position.x)
        setPy(object.position.y)
        setPz(object.position.z)
        setQx(object.quaternion.x)
        setQy(object.quaternion.y)
        setQz(object.quaternion.z)
        setQw(object.quaternion.w)
        requestAnimationFrame(updateTransformDisplay)
    }

    React.useEffect(() => {
        updateTransformDisplay()
        const dispo: IReactionDisposer[] = []
        dispo.push(
            reaction(
                () => objectHandler.fbxObject,
                () => {
                    object = objectHandler.fbxObject
                    updateTransformDisplay()
                }
            )
        )
        return () => {
            for (const d of dispo) d()
            cancelAnimationFrame(reqIdRef.current)
        }
    }, [])

    return <Box>
        <h3>Transform</h3>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField label="pos x" variant="standard" value={px} />
            </Grid>
            <Grid item xs={4}>
                <TextField label="pos y" variant="standard" value={py} />
            </Grid>
            <Grid item xs={4}>
                <TextField label="pos z" variant="standard" value={pz} />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat x" variant="standard" value={qx} />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat y" variant="standard" value={qy} />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat z" variant="standard" value={qz} />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat w" variant="standard" value={qw} />
            </Grid>
        </Grid>
    </Box>
}

export default TransformSettingWindow