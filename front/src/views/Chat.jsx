import Permission from "../components/utils/Permission";
import {SCOPES} from "../utils/permissions-map";
import {useContext, useEffect, useRef, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {UserContext} from "../components/provider/AuthProvider";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    messageFromAuthor: {
        background: '#E4E6EB',
        padding: '5px 15px',
        borderRadius: '10px'
    },
    messageFromSender: {
        background: 'rgb(120,180,232)',
        padding: '5px 15px',
        borderRadius: '10px'
    }
});

export default function Chat() {

    const {user} = useContext(UserContext);

    /* FUNCTIONS */
    const sendMessage = () => {
        setNewMessage(false) ;
        fetch("http://localhost:4000/api/users/"+author.id+"/messages",{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                sendToId: sendTo.id,
                text: messageSenderRef.current.children[1].children[0].value,
                is_read: false
            })
        }).then((res)=> res.json())
            .then( async (data)=> {
                setPremierMessage(true) ;
                setNewMessage(true) ;
                messageSenderRef.current.children[1].children[0].value = "" ;

                await fetch("http://localhost:4000/messages",{
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        'author' : {
                            id: author.id,
                            email: author.email,
                            name: author.name,
                            is_admin: author.is_admin,
                            createdAt: author.createdAt
                        },
                        'sendTo' : {
                            id: sendTo.id,
                            email: sendTo.email,
                            name: sendTo.name,
                            is_admin: sendTo.is_admin,
                            createdAt: sendTo.createdAt
                        },
                        'id' : data.id,
                        'is_read': data.is_read,
                        'is_updated': data.is_updated,
                        'is_deleted' : data.is_deleted,
                        'is_reported': data.is_reported,
                        'is_moderated' : data.is_moderated,
                        'createAt': data.createAt,
                        'updatedAt' : data.updatedAt,
                        'text' : data.text,
                        'deletedAt': data.deletedAt
                    })
                }) ;
            }) ;
    }

    const getMessages = async () => {
        if(author && sendTo) {
            try {
                const res = await fetch("http://localhost:4000/api/users/"+author.id.toString()+"/messages/to/"+sendTo.id.toString(), {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                    }
                })  ;
                const data = await res.json() ;
                setMessages(data);
                if(data.length > messages.length) {
                    setNewMessage(true) ;
                }
            } catch (e) {
                console.error(e) ;
            }

        }
    } ;
    const confirmEdit = () => {
        fetch(`http://localhost:4000/api/users/${author.id}/messages/${messageToEdit.id}`,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                text: messageSenderRef.current.children[1].children[0].value,
                is_updated:true
            })
        }).then((res) => res.json())
            .then( async (data) =>{
                setInEdit(false) ;
                setEditConfirmed(true) ;
                messageSenderRef.current.children[1].children[0].value = "" ;

                await fetch("http://localhost:4000/messages/" + messageToEdit.id,{
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        'is_updated': true,
                        'updatedAt' : data.updatedAt,
                        'text' :data.text,
                    })
                });

            }) ;
    } ;

    const deleteMessage = (key,message) => {
        fetch(`http://localhost:4000/api/users/${author.id}/messages/${message.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                is_deleted:true
            })
        }).then(async () => {
            await getMessages() ;
            await fetch("http://localhost:4000/messages/" + message.id,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    is_deleted:true
                })
            });
        }) ;
    };

    const reportMessage = (key,message) => {
        fetch(`http://localhost:4000/api/users/2/messages/${message.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QiLCJpYXQiOjE2NTg0MTg2OTUsImV4cCI6MTY4OTk3NjI5NX0.yR-oV71SScGAPay2wOUuRqJVmvrigd9Nna1MYnUY10YpI92n3jZIW49SgO0sMKsUSz9WR63A5GTmxG82wCq8TQ',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                is_reported:true
            })
        }).then(async () => {
            await getMessages() ;
            await fetch("http://localhost:4000/messages/" + message.id,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    is_reported:true
                })
            });
        }) ;
    };

    const getUserById = async (id) => {
        const res = await fetch("http://localhost:4000/users/" +id, {
            method: 'GET',
        })  ;
       return await res.json() ;
    } ;

    const getFriends = async (id) => {
        const res = await fetch("http://localhost:4000/friends/" +id, {
            method: 'GET',
        })  ;
        return await res.json() ;
    };

    const setSender = async (friend) => {
        getUserById(friend.id).then(setSendTo) ;
    };

    const addMessageMenuRef = (elm, key) => {
        if(elm &&  !messageMenuRef.current.includes(elm))
            messageMenuRef.current[key] = elm;
    } ;

    const displayButton = (key) => {
         messageMenuRef.current[key].style.display = 'flex' ;
    }
    const hideButton = (key) => {
        messageMenuRef.current[key].style.display = 'none' ;
        messageMenuRef.current[key].children[1].style.display = 'none' ;
    } ;

    const displayButtonGroup = (key) => {
        const menu = messageMenuRef.current[key].children[1] ;
        if(menu.style.display == 'inline-flex')
            hideButton(key) ;
        else menu.style.display = 'inline-flex' ;
    };

    const editMessage = (key, message) => {
        setInEdit(true) ;
        messageSenderRef.current.children[1].children[0].focus() ;
        messageSenderRef.current.children[1].children[0].value = message.text ;
        setMessageToEdit(message) ;
    };

    const cancelEdit = () => {
        setInEdit(false) ;
        messageSenderRef.current.children[1].children[0].value = "" ;
        setMessageToEdit(null) ;
    }

    /* REFS */
    const messageMenuRef = useRef([]) ;
    const messageSenderRef = useRef(null) ;
    const bottomMessageRef = useRef(null) ;

    /* STATES */
    const [messages, setMessages] = useState([]) ;
    const [newMessage, setNewMessage] = useState(false) ;
    const [premierMessage, setPremierMessage] = useState(true) ;
    const [inEdit, setInEdit] = useState(false) ;
    const [messageToEdit,setMessageToEdit] = useState() ;
    const [editConfirmed, setEditConfirmed] = useState(false) ;
    const [author, setAuthor] = useState() ;
    const [sendTo, setSendTo] = useState({id:-1}) ;
    const [friendList, setFriendList] = useState() ;

   useEffect( ()=>{
        getUserById(user?.id).then(setAuthor);
        getFriends(user?.id).then( async (data) =>{
            const friends = [] ;
            for(const friend of data) {
                const fri = await getUserById(friend.friend_id) ;
                friends.push(fri) ;
            }
            setFriendList(friends) ;
        });
    },[]) ;

    useEffect(()=>{
        getMessages();
        if(sendTo.id > 0) {
            const timer = setInterval(getMessages, 1000 * 5);
            return () => clearInterval(timer);
        }
    },[sendTo]) ;

    useEffect(()=> {
        if(premierMessage)
            getMessages();
    },[premierMessage, newMessage]) ;
    useEffect(() => {
        if(premierMessage === true)  {
            bottomMessageRef.current.scrollIntoView({behavior: 'smooth'}) ;
            setPremierMessage(false) ;
        }
        else if (newMessage === true) {
            bottomMessageRef.current.scrollIntoView({behavior: 'smooth'}) ;
            setNewMessage(false) ;
        }
    },[messages]) ;

    useEffect(() => {
        if(editConfirmed) {
            getMessages() ;
            setEditConfirmed(false) ;
            setMessageToEdit(null) ;
        }
    },[editConfirmed]) ;

    const classes = useStyles() ;

    return (
        <>
            <Permission scopes={[SCOPES.canView]}>
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} className={'header-message'}>Chat</Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.chatSection}>
                        <Grid item xs={3} className={classes.borderRight500}>
                            <Grid item xs={12} style={{padding:'10px'}}>  <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth /></Grid>
                            <Divider/>
                            <List>
                                {
                                    friendList == null ? '' : friendList.map( (friend,key) => {
                                        return <ListItem style={{backgroundColor: sendTo.id === friend.id ? 'rgb(120,180,232)': ''}} onClick={() => setSender(friend)} button key={key}>
                                            <ListItemText primary={friend.firstname}/>
                                        </ListItem>
                                    })
                                }
                            </List>
                        </Grid>
                        <Grid item xs={9}>
                            <List style={{paddingBottom: '15px'}} className={classes.messageArea}>
                                {
                                    messages == null ? <h1>Aucun message</h1> :  messages.map((message, key) => {
                                        if(message.is_deleted)
                                            return <ListItem  key={message.id}>
                                                <Grid container style={{justifyContent: message.authorId === author.id ? 'flex-end' : ''}} >
                                                    <Grid className={message.authorId === author.id  ? classes.messageFromAuthor : classes.messageFromSender}  item xs={12}  style={{flex:'initial'}}>
                                                        <ListItemText  style={{fontStyle: "italic"}} align={ message.authorId === author.id  ? 'right' : 'left'} primary={'Ce message a été supprimé'}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        else if (message.is_moderated)
                                            return <ListItem  key={message.id}>
                                                <Grid container style={{justifyContent: message.authorId === author.id  ? 'flex-end' : ''}} >
                                                    <Grid className={message.authorId === author.id  ? classes.messageFromAuthor : classes.messageFromSender}  item xs={12} style={{flex:'initial'}} >
                                                        <ListItemText  style={{fontStyle: "italic", color:'darkorange'}} align={ message.authorId === author.id  ? 'right' : 'left'} primary={'Ce message a été modéré'}/>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        else
                                        if (message.is_updated)
                                            return <ListItem  key={message.id}>
                                                <Grid container style={{justifyContent: message.authorId === author.id ? 'flex-end' : ''}} >
                                                    {
                                                        message.authorId === author.id ?
                                                            <Grid className={message.authorId === author.id ? classes.messageFromAuthor : classes.messageFromSender}  style={{display: "flex" ,alignItems:'center' , flexDirection: 'row-reverse', flex:'initial'}} item xs={12} onMouseLeave={() => hideButton(key)} onMouseOver={() => displayButton(key)}>
                                                                <ListItemText style={{flex:'initial', paddingLeft:'10px'}}  align={ message.authorId === author.id ? 'right' : 'left'} primary={message.text} secondary={'modifié'}  />
                                                                <div style={{ display: 'none ', flexDirection:'row-reverse', alignItems:'center'}} key={key} ref={(ref) => addMessageMenuRef(ref,key)}>
                                                                    <IconButton onClick={() => displayButtonGroup(key)}  size={"small"}  style={{ alignItems:'center' , justifyContent: 'center' , background: '#F5F5F' }}  aria-label="menu"  color="primary" component="label">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <ButtonGroup style={{ display: 'none '}} orientation="vertical" aria-label="vertical outlined button group">
                                                                        <IconButton onClick={() => editMessage(key, message)} >
                                                                            <EditIcon color={"info"} />
                                                                        </IconButton>
                                                                        <IconButton onClick={() => deleteMessage(key,message)}>
                                                                            <DeleteIcon color={"error"}   />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                </div>
                                                            </Grid>
                                                            :
                                                            <Grid className={message.authorId === author.id ? classes.messageFromAuthor : classes.messageFromSender}  style={{display: "flex", alignItems:'center' , flexDirection: 'row', flex:'initial'}}  item xs={12} onMouseLeave={() => hideButton(key)} onMouseOver={() => displayButton(key)}>
                                                                <ListItemText  align={ message.authorId === author.id ? 'right' : 'left'} primary={message.text} secondary={'modifié'} />
                                                                <div style={{ display: 'none ', flexDirection:'row', alignItems:'center'}} key={key} ref={(ref) => addMessageMenuRef(ref,key)}>
                                                                    <IconButton onClick={() => displayButtonGroup(key)}  size={"small"}  style={{ alignItems:'center' , justifyContent: 'center' , background: '#F5F5F' }}  aria-label="menu"  color="primary" component="label">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <ButtonGroup style={{ display: 'none '}} orientation="vertical" aria-label="vertical outlined button group">
                                                                        <IconButton onClick={() => reportMessage(key,message)} >
                                                                            <ReportProblemIcon color={"warning"} />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                </div>
                                                            </Grid>
                                                    }
                                                </Grid>
                                            </ListItem>
                                        else {
                                            return <ListItem   key={message.id}>
                                                <Grid container style={{justifyContent: message.authorId === author.id ? 'flex-end' : ''}}>
                                                    {
                                                        message.authorId === author.id ?
                                                            <Grid className={message.authorId === author.id ? classes.messageFromAuthor : classes.messageFromSender}  style={{display: "flex", alignItems:'center' , justifyContent:'flex-end', flexDirection: 'row-reverse', flex:'initial'}}  item xs={12} onMouseLeave={() => hideButton(key)} onMouseOver={() => displayButton(key)}>
                                                                <ListItemText style={{flex:'initial', paddingLeft:'10px'}} align={ message.authorId === author.id ? 'right' : 'left'} primary={message.text} />
                                                                <div style={{ display: 'none ',flexDirection:'row-reverse', alignItems:'center'}} key={key} ref={(ref) => addMessageMenuRef(ref,key)}>
                                                                    <IconButton onClick={() => displayButtonGroup(key)}  size={"small"}  style={{ alignItems:'center' , justifyContent: 'center' , background: '#F5F5F' }}  aria-label="menu"  color="primary" component="label">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <ButtonGroup style={{ display: 'none '}} orientation="vertical" aria-label="vertical outlined button group">
                                                                        <IconButton  onClick={() => editMessage(key, message)} >
                                                                            <EditIcon color={"info"} />
                                                                        </IconButton>
                                                                        <IconButton onClick={() => deleteMessage(key,message)} >
                                                                            <DeleteIcon color={"error"}   />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                </div>
                                                            </Grid>
                                                            :
                                                            <Grid className={message.authorId === author.id ? classes.messageFromAuthor : classes.messageFromSender} style={{display: "flex",  alignItems:'center' , flexDirection: 'row', flex:'initial'}}  item xs={12} onMouseLeave={() => hideButton(key)} onMouseOver={() => displayButton(key)}>
                                                                <ListItemText style={{}} align={ message.authorId === author.id ? 'right' : 'left'} primary={message.text} />
                                                                <div style={{ display: 'none ', flexDirection:'row', alignItems:'center'}} key={key} ref={(ref) => addMessageMenuRef(ref,key)}>
                                                                    <IconButton onClick={() => displayButtonGroup(key)}  size={"small"}  style={{ alignItems:'center' , justifyContent: 'center' , background: '#F5F5F' }}  aria-label="menu"  color="primary" component="label">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                    <ButtonGroup style={{ display: 'none '}} orientation="vertical" aria-label="vertical outlined button group">
                                                                        <IconButton onClick={() => reportMessage(key,message)} >
                                                                            <ReportProblemIcon color={"warning"} />
                                                                        </IconButton>
                                                                    </ButtonGroup>
                                                                </div>
                                                            </Grid>
                                                    }
                                                </Grid>
                                            </ListItem>
                                        }
                                    })
                                }
                                <div style={{paddingBottom:'20px'}} ref={bottomMessageRef}/>
                            </List>
                            <Divider/>
                            {
                                inEdit ?
                                    <Grid container style={{padding: '20px'}}>
                                        <Grid item xs={11} style={{display: "flex" , flexDirection: "row" , alignItems: "center"}}>
                                            <TextField  ref={messageSenderRef} id="outlined-basic-email" label="Type Something" fullWidth />
                                            <IconButton onClick={() => cancelEdit()}>
                                                <ClearIcon color={"warning"} />
                                            </IconButton>
                                        </Grid>
                                        <Grid xs={1} align="right">
                                            <Fab onClick={() => confirmEdit()} style={{background: 'rgb(25, 118, 210)', color: 'white'}}  aria-label="add"><EditIcon/></Fab>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container style={{padding: '20px'}}>
                                        <Grid item xs={11}>
                                            <TextField ref={messageSenderRef} id="outlined-basic-email" label="Type Something" fullWidth />
                                        </Grid>
                                        <Grid xs={1} align="right">
                                            <Fab onClick={() => sendMessage()} style={{background: 'rgb(25, 118, 210)', color: 'white'}}  aria-label="add"><SendIcon /></Fab>
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
            </Permission>
        </>
    );
}
