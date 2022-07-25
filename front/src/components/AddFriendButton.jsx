import {Button, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";

export default function AddFriendButton({userId}) {
    const [loading, setLoading] = useState(false);
    const [variant, setVariant] = useState('outlined');
    const [snackbarOpened, setSnackbarOpened] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [buttonText, setButtonText] = useState('Add friend');

    useEffect(() => {
        if (success) {
            setButtonText('Friend added');
            setVariant('contained');
        }
        if (loading) {
            setButtonText('Loading...');
            setVariant('contained');
        }
    }, [loading, success]);

    const addFriend = () => {
        try {
            setLoading(true)
            console.log('adding friend', userId);
            // If request
            setSnackbarMessage('Friend added');
            setSuccess(true);
            setVariant('contained');
        } catch (e) {
            setSnackbarMessage('Error adding friend');
        } finally {
            setLoading(false)
            displaySnack();
        }
    }

    const displaySnack = () => {
        setSnackbarOpened(true);
        setTimeout(() => {
            setSnackbarOpened(false);
        }, 2000);
    }

    return (
        <>
            <Button disabled={success} variant={variant} size="small" onClick={addFriend}>
                {buttonText}
            </Button>
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={2000}
                message={snackbarMessage}/>
        </>
    )
}