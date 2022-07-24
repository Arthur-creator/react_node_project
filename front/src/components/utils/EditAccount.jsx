import {Button, TextField} from "@material-ui/core";
import {Grid} from "@mui/material";
import {useEffect, useState} from "react";

export const EditAccount = () => {
    const userUrl = window.location.pathname;
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    const [initialValues,setInitialValues] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/api/'+userUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
            }
        }).then(res => res.json())
            .then(data => setUser(data))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setInitialValues({
            name: user ? user.name : "",
            email: user ? user.email : "",
            password: ""
        })
    }, [user])

    const editField = (newValue) => {
        const fieldName = newValue.target.name;
        setInitialValues(
            {
                ...initialValues,
                [fieldName]: newValue.target.value,
            }
        );
    }

    const sendData = () => {
        /* delete password from initialValues if empty */
        if (initialValues.password === "") {
            delete initialValues.password;
        }
        console.log(initialValues)
        fetch('http://localhost:4000/api/'+userUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               ...initialValues
            })
        }).then(res => res.json())
            .then(data => setUser(data))
            .finally(() => console.log("done"))
    }

    return (
        !loading &&
        <>
            <h2>Modification de l'utilisateur</h2>
            <Grid container>
                <Grid item xs={12} padding={3}>
                    <TextField label="Name" name="name" variant="outlined" fullWidth value={initialValues.name} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Grid item xs={12} padding={3}>
                    <TextField label="Email" name="email" variant="outlined" fullWidth value={initialValues.email} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Grid item xs={12} padding={3}>
                    <TextField type="password" label="Password" name="password" variant="outlined" fullWidth value={initialValues.password} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Button variant="contained" onClick={sendData}>Envoyer</Button>
            </Grid>
        </>
    )
}