import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";
import { useState, useContext } from "react";
import RecommendedFriends from "../components/RecommendedFriends";
import { useSearchParams } from "react-router-dom";
import AddFriendButton from "../components/AddFriendButton";
import { UserContext } from "../components/provider/AuthProvider";
import { useEffect } from "react";

function UserCard({ userData }) {
    console.log(userData)
    const { user } = useContext(UserContext);
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                    }}>
                       <ProfilePicture name={`${user.firstname} ${user.lastname}`} />
                        <Box>
                            <Typography variant="h5" component="div">{userData.firstname} {userData.lastname}</Typography>
                            {/* <Typography color="text.secondary">{userData.class}</Typography> */}
                        </Box>
                    </Box>
                    <AddFriendButton sourceId={user.id} targetId={userData.id} />
                </Box>
            </CardContent>
        </Card>
    );
}

function SearchResults() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const query = searchParams.get('q');
            try {
                const response = await fetch(`http://localhost:4000/search-users?q=${query}`);
                const data = await response.json();
                setUsers(data);
                console.log(data)
            } catch (e) {
                console.log(e);
            }
        })();
    }, [searchParams]);

    return (
        <Stack spacing={2}>
            <Typography variant="h5" component="h2">Results for <strong>{searchParams.get('q')}</strong></Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                {users.map(user => <UserCard key={user.name} userData={user} />)}
            </Box>
        </Stack>
    )
}


export default function Search() {

    return (
        <Box sx={{ paddingTop: 3 }}>
            {/* <RecommendedFriends sx={{ marginBottom: 4 }} /> */}
            <SearchResults />
        </Box>
    );
}