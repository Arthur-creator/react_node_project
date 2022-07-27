import {UserContext} from "../components/provider/AuthProvider";
import {useContext, useState} from "react";
import {Divider, Grid, List, ListItem, ListItemText, TextField, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import {SCOPES} from "../utils/permissions-map";
import Permission from "../components/utils/Permission";
import FriendList from "../components/FriendList";

export default function UserProfile () {
    const {user} = useContext(UserContext);
    const [technologies, setTechnologies] = useState([{name:'JavaScript',url:"https://www.softfluent.fr/blog/enregistrer-du-son-via-le-microphone-en-javascript/"}]) ;

    return (
        <>
            <Permission scopes={[SCOPES.canView]}>
                <div style={{marginTop:'50px'}}>
                    <Grid container >
                        <Grid item xs={3} >
                            <List>
                                <div style={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center', marginBottom:'25px'}}>
                                    <Avatar  sx={{ width: 80, height: 80 }}  color={'#6aa8e0'}>
                                        <PersonIcon sx={{ fontSize: 60 }} />
                                    </Avatar>
                                    <Typography sx={{ fontSize: 25 }}>{user.firstname} {user.lastname}  </Typography>
                                    { user.age !== null ? <Typography>{user.age} ans </Typography> : ''}
                                </div>
                                <Divider/>
                                <div style={{display:"flex", alignItems:'center', justifyContent:"center" , flexDirection:'column'}}>
                                    <Typography style={{marginTop:'15px'}}>Liste d'amis</Typography>
                                    <Grid item xs={12} style={{padding:'10px'}}>  <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth /></Grid>
                                    <Divider/>
                                </div>
                            </List>
                        </Grid>
                        <Divider/>
                        <Grid item xs={9}>
                            <List>
                                <Typography>Technologies favorites</Typography>
                                {technologies?.length>0 ? technologies.map( (techno) => {
                                    return <Grid key={techno.name}>
                                        <ListItem>
                                            <img width={50} height={50}  alt={'Image de ' + techno.name} src={techno.url} />
                                            <ListItemText primary={techno.name}/>
                                        </ListItem>
                                    </Grid>

                                }) : <Typography> Aucune technlogie préféré a été choisie pour le moment </Typography>
                                }
                            </List>
                        </Grid>
                        <Box>
                            <FriendList userId={user.id}/>
                        </Box>
                    </Grid>
                </div>
            </Permission>
        </>
    ) ;
}