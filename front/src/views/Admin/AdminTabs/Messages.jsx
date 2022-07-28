import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Button, Table, TableHead} from "@mui/material";
import {TableBody, TableCell, TableRow} from "@material-ui/core";
import {useEffect, useState} from "react";

export default function Messages() {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("http://localhost:4000/messages", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }).then(res => res.json())
            .then(data => setMessages(data))
            .finally(() => setLoading(false))
    }, [])

    const deleteMessage = (message) => {
        fetch("http://localhost:4000/api/messages/" + message.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                is_moderated: true
            })
        }).then(res => res.json())
        fetch("http://localhost:4000/messages/" + message.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                is_moderated: true
            })
        }).finally(() => setLoading(false))
    }

    const abortReport = (message) => {
        fetch("http://localhost:4000/api/messages/" + message.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                is_reported: false
            })
        }).then(res => res.json())
        fetch("http://localhost:4000/messages/" + message.id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                is_reported: false
            })
        }).finally(() => setLoading(false))
    }
    return (
        !loading &&
        <>
            <h2>Liste des messages reportés</h2>
            {
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Auteur</strong></TableCell>
                            <TableCell><strong>Message</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages && messages.map(message => {
                            return <TableRow key={message.id}>
                                <TableCell>
                                    <ListItem>
                                        <ListItemText primary={message.author.firstname}
                                                      secondary={message.author.lastname}/>
                                        <ListItemText/>
                                    </ListItem>
                                </TableCell>
                                <TableCell>
                                    {message.text}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteMessage(message)}>Supprimer le message</Button>
                                    <Button onClick={() => abortReport(message)}>Classer sans suite</Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            }
        </>
    )
}