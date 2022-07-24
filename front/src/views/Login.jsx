import * as React from 'react';
import {Alert, Snackbar, Box, Button, Grid, TextField, Typography} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {loginUser} from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../App";

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        loginUser(user).then(response => {
            setUser(response);
            navigate('/');
        }).catch(error => {
            if (error.response.data.message) {
                setMessage(error.response.data.message);
            }
            setSeverity('error');
            setOpen(true);
        });
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {message && <Snackbar onClose={handleClose} autoHideDuration={6000} open={open}><Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>{message}</Alert></Snackbar>}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Log In
                </Button>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            Register
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/login  " variant="body2">
                            Forgot password
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}