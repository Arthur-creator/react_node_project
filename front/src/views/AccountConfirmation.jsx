import * as React from 'react';
import Link from '@mui/material/Link';
import {verifyUser} from "../services/UserService";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const AccountConfirmation = (props) => {

    const isVerified = false;
    const conformationCode = useParams();

    useEffect(() => {
        if (verifyUser(conformationCode.confirmationCode)) {
            const isVerified = true;
        }
    }, []);

    return (
        <div>
            {isVerified ? <div>Account confirmed</div> : <div>Account not confirmed</div>}
            {isVerified ? <Link to="/login">Login</Link> : <Link to="/">Home</Link>}
        </div>
    );
};

export default AccountConfirmation;