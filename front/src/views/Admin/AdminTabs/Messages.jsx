import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Table, TableHead} from "@mui/material";
import {TableBody, TableCell, TableRow} from "@material-ui/core";
import {useEffect, useState} from "react";

export default function Messages() {

    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:4000/messages", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
            }
        }).then(res => res.json())
            .then(data => setMessages(data))
            .finally(() => setLoading(false))
    }, [])

    const deleteAdmin = (user) => {
        console.log(user)
    }

    const cancelReport = (user) => {
        console.log(user)
    }

    return (
        !loading &&
        <>
            <h2>Liste des messages reportés</h2>
            {
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Utilisateur</strong></TableCell>
                            <TableCell><strong>Message</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            messages.map( message => (
                                <TableRow>
                                    <TableCell>{message.author}</TableCell>
                                    <TableCell>{message.text}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}
