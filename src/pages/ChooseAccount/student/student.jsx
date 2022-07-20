/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './style.css';

const Student = () => {
    return (
        <div className={'MH_DangNhap'}>
            <div className={'image-4'}>
                <img src={require('../../../images/kahoot.png')} />
            </div>
            <div className={'Rectangle-32'}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField className={'Rectangle-4'} label="Game PIN" placeholder="Game PIN" />
                        </Grid>
                        <Grid item xs={12}>
                            <button className={'Rectangle-6'} type="submit">Submit</button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};
export default Student