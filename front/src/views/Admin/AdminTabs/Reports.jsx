import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {IconButton} from "@mui/material";
import GavelIcon from '@mui/icons-material/Gavel';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";

export default function Reports() {
    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(true)
    const [reloadData,setReloadData] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/api/users?isReported=true", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
            }
        }).then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setLoading(false))
    }, [reloadData])

    const validReport = (user) => {
        console.log(user.numberReport)
        fetch("http://localhost:4000/api/users/" + user.id,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                deletedAt: user.nombreReported === 2 && new Date(),
                isReported:false,
                nombreReported: user.nombreReported ? user.nombreReported + 1 : 1
            })
        }).then(res => res.json(reloadData ? setReloadData(false) : setReloadData(true)))
            .finally(() => setLoading(false))    }

    const abortReport = (user) => {
        fetch("http://localhost:4000/api/users/" + user.id,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                isReported:false
            })
        }).then(res => res.json(reloadData ? setReloadData(false) : setReloadData(true)))
            .finally(() => setLoading(false))
    }

    return (
        !loading &&
        <>
            <h2>Liste des utilisateurs</h2>
            {
                users.map(user => {
                    return (
                        <div key={user.name}>
                            <ListItem button key={"RemySharp"}>
                                <ListItemText primary={user.name}/>
                                <ListItemText primary={user.email}/>
                                <IconButton aria-label="Example" onClick={() => validReport(user)}>
                                    <GavelIcon />
                                </IconButton>
                                <IconButton aria-label="Example" onClick={() => abortReport(user)}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItem>
                        </div>
                    )
                })
            }
        </>
    )
}
