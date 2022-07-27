import Permission from "../components/utils/Permission";
import { SCOPES } from "../utils/permissions-map";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/provider/AuthProvider";
import {Card, CardContent, CardActions, Typography, Box} from "@mui/material";
import AddFriendButton from "../components/AddFriendButton";
import ProfilePicture from "../components/ProfilePicture";



function UserCard({userData}) {
    const {user} = useContext(UserContext);
    return (
        <Card sx={{ width: "390px" }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    marginBottom: 2,
                }}>
                    <ProfilePicture name={`${userData.firstname} ${userData.lastname}`} />
                    <Box>
                        <Typography variant="h6" component="div">{userData.firstname} {userData.lastname}</Typography>
                        <Typography color="text.secondary">{userData.class}</Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    Je possède des thunes.
                </Typography>
            </CardContent>
            <CardActions>
                <AddFriendButton sourceId={user.id} targetId={userData.id} />
            </CardActions>
        </Card>
    )
}
function UserList() {
    const {user} = useContext(UserContext);
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
            {users.map(item => {
                if (user.id === item.id) return <></>;
                return <UserCard key={item.id} userData={item} />
            })}
        </Box>
    )
}


export default function Home({ title }) {
    const { user } = useContext(UserContext);
    return (
        <>
            <h1>Welcome to Techie!</h1>
            <UserList />
        </>
    )
}
