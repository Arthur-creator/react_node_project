import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import ProfilePicture from "./ProfilePicture";
import {useEffect, useState} from "react";


function RecommendedFriendCard({user}) {
    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    marginBottom: 2,
                }}>
                    <ProfilePicture name={user.name}/>
                    <Box>
                        <Typography variant="h5" component="div">{user.name}</Typography>
                        <Typography color="text.secondary">{user.class}</Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    Je suis très riche.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add as friend</Button>
            </CardActions>
        </Card>
    )
}

export default function RecommendedFriends({sx}) {
    const [recommendedFriends, setRecommendedFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);
            console.log('fetching recommended friends');
            setRecommendedFriends([{
                name: 'Antoine Daniel',
                class: '4IW1',
            }, {
                name: 'Hans Burger',
                class: '4IW3',
            }, {
                name: 'Adrien Morin',
                class: '3IW2',
            }, {
                name: 'Adrien Morin',
                class: '3IW2',
            }, {
                name: 'Adrien Morin',
                class: '3IW2',
            }]);
        } catch (e) {
            console.log('error fetching recommended friends');
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <Box sx={sx}>
            <Typography variant="p" component="p">Recommended friends</Typography>
            <Box sx={{overflowX: "scroll", paddingY: 1}}>
                <Box sx={{display: 'flex', gap: 2, flexWrap: 'nowrap', width: 'max-content'}}>
                    {recommendedFriends.map(user => <RecommendedFriendCard key={user.name} user={user}/>)}
                </Box>
            </Box>
        </Box>
    );
}