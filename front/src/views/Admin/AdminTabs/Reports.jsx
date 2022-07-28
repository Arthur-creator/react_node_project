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
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setLoading(false))
    }, [reloadData])

    const validReport = (user) => {
        if (user.nombreReported === 2) {
            fetch("http://localhost:4000/api/users/" + user.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => res.json())
        }

        fetch("http://localhost:4000/api/users/" + user.id,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                isReported:false,
                nombreReported: user.nombreReported ? user.nombreReported + 1 : 1
            })
        }).then(res => res.json(reloadData ? setReloadData(false) : setReloadData(true)))
            .finally(() => setLoading(false))    }

    const abortReport = (user) => {
        fetch("http://localhost:4000/api/users/" + user.id,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
                        <div key={user.id}>
                            <ListItem button key={"RemySharp"}>
                                <ListItemText primary={user.lastname} secondary={user.primary}/>
                                <ListItemText primary={user.email}/>
                                <ListItemText primary="nombre de reports" secondary={user.nombreReported ? user.nombreReported : 0}/>
                                <IconButton aria-label="Valider le report" onClick={() => validReport(user)}>
                                    <GavelIcon />
                                </IconButton>
                                <IconButton aria-label="Annuler le report" onClick={() => abortReport(user)}>
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
