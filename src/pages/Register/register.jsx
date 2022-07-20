/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef, useState, useEffect } from "react";
import axios from '../../base/axios';
import { Link } from 'react-router-dom';
// import http from '../../base/http'


const Register = () => {
    const REGISTER_URL = "/user/register";
    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [image, setImage] = useState("")
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respone = await axios.post(
                REGISTER_URL,
                JSON.stringify({ email, password, phone, address,name,image}),
                {
                    headers: {
                        "Content-Type": "application/json" },
                },
            );
            console.log (respone)
            setSuccess(true);
            //clear state and controlled inputs
            setEmail("");
            setPassword("");
           
        } catch (err) {
            console.log(err)
        }
       
    }
    return (
        <>
            <div>
                <div className={'MH_DangNhap'}>
                    <div className={'image-4'}>
                        <img src={require('../../images/kahoot.png')} />
                    </div>
                    <div className={'Rectangle-31'}>
                        <Grid item xs={12}>
                            <h1 className={'Log_in_1'}>Sign Up</h1>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <Grid>
                                    <form onSubmit={handleSubmit}>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                label="Email"
                                                placeholder="please enter username"
                                                type="text"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                label="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                label="Name"
                                                placeholder="please enter full name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                label="Phone"
                                                placeholder="please enter phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                label="Address"
                                                placeholder="please enter address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={'Rectangle-4'}
                                                type="file"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                
                                        </Grid>
                                        <Grid item xs={12}>
                                            <button className={'Rectangle-6'} type="submit">
                                                Sign Up
                                            </button>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Box>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register