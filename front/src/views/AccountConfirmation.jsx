import * as React from 'react';
import Link from '@mui/material/Link';
import {verifyUser} from "../services/AuthService";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const AccountConfirmation = (props) => {

    const [isVerified, setIsVerified] = React.useState(false);
    const conformationCode = useParams().confirmationCode;

    useEffect(() => {
        verifyUser(conformationCode)
            .then(response => {
                setIsVerified(true);
            }
            )
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {isVerified ? <div>Account confirmed</div> : <div>An Error Occur</div>}
            {isVerified ? <Link href="/login">Login</Link> : <Link href="/">Return to home</Link>}
        </>
    );
};

export default AccountConfirmation;