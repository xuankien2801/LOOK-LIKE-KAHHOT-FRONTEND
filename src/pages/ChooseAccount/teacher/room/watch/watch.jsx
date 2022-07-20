/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Grid, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const ViewRoom = () => {
    return (
        <>
            <div class="Mn-hnh-View-Room-List-1">
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
                        <Grid sx={{ justtifyContent: 'right' }} item xs={12}>
                            <Grid container spacing={2}>
                                <Grid sx={{ justifyContent: 'left' }} item xs={6}>
                                    <div class="Room">Room: 1</div>
                                </Grid>
                                <Grid sx={{ justifyContent: 'right' }} item xs={6}>
                                    {' '}
                                    <Button class="Start-room">START</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell align="center">Question</TableCell>
                                                    <TableCell align="center">A</TableCell>
                                                    <TableCell align="center">B</TableCell>
                                                    <TableCell align="center">C</TableCell>
                                                    <TableCell align="center">D</TableCell>
                                                    <TableCell align="center">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">1</TableCell>
                                                    <TableCell align="center">Web</TableCell>
                                                    <TableCell align="center">123456</TableCell>
                                                    <TableCell align="center">20-07-2022</TableCell>
                                                    <TableCell align="center">25-07-2022</TableCell>
                                                    <TableCell align="center">Đúng</TableCell>
                                                    <TableCell align="center">
                                                        <Button class="btn-edit">
                                                            <IconButton
                                                                aria-label="delete"
                                                                size="small"
                                                                sx={{ color: grey[50] }}
                                                            >
                                                                <UpgradeIcon />
                                                            </IconButton>
                                                            Update
                                                        </Button>
                                                        <Button class="btn-edit1">
                                                            <IconButton
                                                                aria-label="delete"
                                                                size="small"
                                                                sx={{ color: grey[50] }}
                                                            >
                                                                <DeleteIcon />
                                                                Delete
                                                            </IconButton>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};
export default ViewRoom;
