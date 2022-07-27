import {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {UserContext} from "../../../components/provider/AuthProvider";
import Typography from "@material-ui/core/Typography";
import {Stack} from "@mui/material";

export default function Analytics() {
    const [messagesAnalutics, setMessagesAnalytics] = useState() ;
    const [messUser,setMessUser] = useState(0) ;

    const user = useContext(UserContext) ;
    useEffect(() => {
        fetch('http://localhost:4000/analytiques/messages/total',{
            'Authorization': 'Bearer ' + user?.accessToken ?? localStorage.getItem('token'),
        }).then((res) =>res.json()).then((data) =>{
            setMessagesAnalytics(data) ;
        }) ;
        fetch('http://localhost:4000/analytiques/messages/total-per-users',{
            'Authorization': 'Bearer ' + user?.accessToken ?? localStorage.getItem('token'),
        }).then((res) =>res.json()).then((data) =>{
            let moy = 0 ;
            for(const donnee of data) {
                moy+= donnee.total ;
            }
            setMessUser(moy / data.length) ;
        }) ;

    },[]) ;

    return (
     <Grid container alignItems={"center"} justifyContent={"center"}>
         <Typography >
             Nombre total de messages envoyés : {messagesAnalutics}
         </Typography>
         <Typography>
             Nombre moyen de message envoyé : {messUser}
         </Typography>
     </Grid>
    )

}