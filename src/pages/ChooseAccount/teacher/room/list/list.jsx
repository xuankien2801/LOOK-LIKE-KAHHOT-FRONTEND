/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../../../../bases/axios';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { grey } from '@mui/material/colors';
const ListRoom = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get('/room/13').then((response) => {
            console.log(response.data.data);

            setData(response.data.data);

            console.log(data.id);
        });
    }, []);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        try {
            const respone = await axios.post('/room/create/13', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(respone.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div class="MH-View-Room-List-1">
                <div class="Rectangle-13">
                    <div className={'image-5'}>
                        <img src={require('../../../../../images/kahoot.png')} />
                    </div>
                    <div className={'dropdown'}>
                        <img className="dropbtn" src={require('../../../../../images/user.png')} />
                        <div class="dropdown-content">
                            <Link className={'dropdown-content-a'} to="#">
                                Personal Information
                            </Link>
                            <Link className={'dropdown-content-a'} to="#">
                                Change Password
                            </Link>
                            <Link className={'dropdown-content-a'} to="#">
                                Log out
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="Rectangle-33">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div class="Room">List Room</div>
                        </Grid>
                        <Grid item xs={6}>
                            <Button class="Start-room1" onClick={handleCreateRoom}>
                                Create Room
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID Room</TableCell>                                            
                                            <TableCell align="center">PIN</TableCell>
                                            <TableCell align="center">Date-Start</TableCell>
                                            <TableCell align="center">Date-End</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* data fake */}
                                        <TableRow>
                                            <TableCell align="left">1</TableCell>
                                            <TableCell align="center">547123</TableCell>
                                            <TableCell align="center">17/07/2022</TableCell>
                                            <TableCell align="center">20/07/2022</TableCell>
                                            <TableCell align="center">
                                                <Link style={{ textDecoration: 'none' }} to="/watch-room">
                                                    <Button class="btn-edit">
                                                        <IconButton aria-label="delete" size="small" sx={{ color: grey[50] }}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        Watch
                                                    </Button>
                                                </Link>
                                                <Button class="btn-edit1">
                                                    <IconButton aria-label="delete" size="small" sx={{ color: grey[50] }} >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default ListRoom;
