import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Users() {

    const [users,setUsers] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/api/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
                'Content-type': 'application/json',
            }
        }).then(res => res.json())
        .then(data => setUsers(data))
        .finally(() => setLoading(false))
    }, [])

    const deleteUser = (user) => {
        fetch("http://localhost:4000/api/users", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
                'Content-type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => console.log('deleted'))
    }

    const editUser = (user) => {
        navigate(`/users/${user.id}`)
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
                            <ListItemText>{user.name}</ListItemText>
                            <ListItemText>{user.email}</ListItemText>
                            <IconButton aria-label="Example" onClick={deleteUser}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="Example" onClick={ () => editUser(user)}>
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
