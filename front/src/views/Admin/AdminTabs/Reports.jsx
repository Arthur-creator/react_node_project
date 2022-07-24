import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useEffect, useState} from "react";

export default function Reports() {

    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:4000/api/users?isReported=true", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
            }
        }).then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setLoading(false))
    }, [])

    const deleteUser = (user) => {
        console.log(user)
    }

    const abortReport = (user) => {
        console.log(user)
    }

    return (
        !loading &&
        <>
            <h2>Liste des utilisateurs</h2>
            {
                users.map(user => {
                    console.log('user',user)
                    return (
                        <div key={user.name}>
                            <ListItem button key={"RemySharp"}>
                                {/*<ListItemIcon>*/}
                                {/*    <Avatar src={user.picture} alt={user.name}/>*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary={user.name}/>
                                <ListItemText primary={user.email}/>
                                <IconButton aria-label="Example" onClick={deleteUser}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton aria-label="Example" onClick={abortReport}>
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                        </div>
                    )
                })
            }
        </>
    )
}
