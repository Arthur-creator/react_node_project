import Permission from "../components/utils/Permission";
import { SCOPES } from "../utils/permissions-map";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/provider/AuthProvider";
import {Card, CardContent, CardActions, Typography, Box} from "@mui/material";
import AddFriendButton from "../components/AddFriendButton";
import ProfilePicture from "../components/ProfilePicture";

function UserCard({userFriend, source}) {
    return (
        <Card sx={{ width: "390px" }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    marginBottom: 2,
                }}>
                    <ProfilePicture name={`${userFriend.firstname} ${userFriend.lastname}`} />
                    <Box>
                        <Typography variant="h6" component="div">{userFriend.firstname} {userFriend.lastname}</Typography>
                        <Typography color="text.secondary">{userFriend.class}</Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    Je possède des thunes.
                </Typography>
            </CardContent>
            <CardActions>
                <AddFriendButton sourceId={source} targetId={userFriend.id} />
            </CardActions>
        </Card>
    )
}
function UserList({source}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:4000/users");
                const data = await response.json();
                setUsers(data);
            } catch (e) {
                console.log(e);
            }

        })();
    }, [])

    return (
        <Box sx={{display: 'flex', gap: 2}}>
            {users.map(user => <UserCard key={user.id} userFriend={user} source={source?.id}  />)}
        </Box>
    )
}


export default function Home({ title }) {
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Welcome to Techie!</h1>
            <UserList source={user.id} />
        </>
    )
}