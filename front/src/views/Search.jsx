import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import ProfilePicture from "../components/ProfilePicture";
import {useState} from "react";
import RecommendedFriends from "../components/RecommendedFriends";
import {useSearchParams} from "react-router-dom";
import AddFriendButton from "../components/AddFriendButton";


function UserCard({user}) {
    return (
        <Card sx={{minWidth: 275}}>
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
                        <ProfilePicture name={user.name}/>
                        <Box>
                            <Typography variant="h5" component="div">{user.name}</Typography>
                            <Typography color="text.secondary">{user.class}</Typography>
                        </Box>
                    </Box>
                    <AddFriendButton/>
                </Box>
            </CardContent>
        </Card>
    );
}

function SearchResults() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([
        {
            name: 'Antoine Daniel',
            class: '4IW1',
        },
        {
            name: 'Hans Burger',
            class: '4IW3',
        },
    ]);

    return (
        <Stack spacing={2}>
            <Typography variant="h5" component="h2">Results for <strong>{searchParams.get('q')}</strong></Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                {users.map(user => <UserCard key={user.name} user={user}/>)}
            </Box>
        </Stack>
    )
}


export default function Search() {

    return (
        <Box sx={{paddingTop: 3}}>
            <RecommendedFriends sx={{marginBottom: 4}}/>
            <SearchResults/>
        </Box>
    );
}