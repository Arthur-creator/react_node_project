import {UserContext} from "../components/provider/AuthProvider";
import {useContext} from "react";
import {Button, Divider, Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import {SCOPES} from "../utils/permissions-map";
import Permission from "../components/utils/Permission";
import FriendList from "../components/FriendList";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

export default function UserProfile () {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const editUser = () => {
        navigate(`/users/${user.id}`) ;
    }
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
                            </List>
                        </Grid>
                        <Divider/>
                        <Grid item xs={9}>
                            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => editUser()}>
                                Modifier le profil
                            </Button>
                            <List>
                                <Typography>Technologies favorites</Typography>
                                {user?.technos !== null ?  user?.technos.split('0').map( (techno,key) => {
                                    return <Grid key={key}>
                                        <ListItem>
                                            <img width={50} height={50}  alt={'Image de ' + techno} src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/"+techno+"/"+techno+"-original.svg"} />
                                            <ListItemText primary={techno}/>
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