import React, { useState } from 'react';
// import './test.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from '../../base/axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respone = await axios.post('/user/login',
              { email, password },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        origin: 'http://localhost:63342',
                    },
                
            )
            console.log(respone.data)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className={'MH_Dang_Nhap'}>
                <div className={'image-4'}>
                    <img src={require('../../images/kahoot.png')} />
                </div>
                <div className={'Rectangle-3'}>
                    <Grid item xs={12}>
                        <h1 className={'Log_in'}>Login</h1>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid item xs={12}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField className={'Rectangle-4'}
                                            label="Email"
                                            placeholder="Username or email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField className={'Rectangle-4'}
                                            label="Password"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="please enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <button className={'Rectangle-6'} type="submit">Login</button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <span className={'Dont-have-an-account'}>Don't have an account?</span>
                                        <Link to="/sign-up">
                                            <span className={'Sign_up'}> Sign up!</span>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
