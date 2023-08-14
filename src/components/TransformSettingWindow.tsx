import React from "react";
import { Box, Grid, TextField } from '@mui/material'
import { objectHandler } from "../stores/ObjectHandler";

const TransformSettingWindow: React.FC = () => {
    const object = objectHandler.fbxObject
    return <Box>
        <h3>Transform</h3>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <TextField label="pos x" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField label="pos y" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField label="pos z" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat x" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat y" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat z" variant="outlined" />
            </Grid>
            <Grid item xs={3}>
                <TextField label="quat w" variant="outlined" />
            </Grid>
        </Grid>
    </Box>
}

export default TransformSettingWindow