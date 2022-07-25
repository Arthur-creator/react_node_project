import {Box, Button, Card, CardActions, CardContent, Skeleton, Stack, Typography} from "@mui/material";
import ProfilePicture from "./ProfilePicture";
import {useEffect, useState} from "react";
import AddFriendButton from "./AddFriendButton";


function SkeletonLoader() {
    return (
        <Box sx={{overflowX: "scroll", paddingY: 1}}>
            <Box sx={{display: 'flex', gap: 2, flexWrap: 'nowrap', width: 'max-content'}}>
                {Array.from({length: 5}).map(() =>
                    <Stack spacing={1} width="250px">
                        <Stack direction="row" spacing={2}>
                            <Skeleton variant="circular" width={40} height={40}/>
                            <Stack spacing={-0.5}>
                                <Skeleton variant="text" width={150} height={40}/>
                                <Skeleton variant="text" width={60} height={20}/>
                            </Stack>
                        </Stack>
                        <Skeleton variant="rectangular" height={60}/>
                        <Skeleton variant="rectangular" height={30} width={107}/>
                    </Stack>
                )}
            </Box>
        </Box>
    )
}

function RecommendedFriendCard({user}) {
    return (
        <Card sx={{width: "250px"}}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    marginBottom: 2,
                }}>
                    <ProfilePicture name={user.name}/>
                    <Box>
                        <Typography variant="h6" component="div">{user.name}</Typography>
                        <Typography color="text.secondary">{user.class}</Typography>
                    </Box>
                </Box>
                <Typography variant="body2">
                    Je possède des thunes.
                </Typography>
            </CardContent>
            <CardActions>
                <AddFriendButton/>
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
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [])

    return (
        <Box sx={sx}>
            <Typography variant="p" component="p">Recommended friends</Typography>
            {loading ? <SkeletonLoader/> :
                <Box sx={{overflowX: "scroll", paddingY: 1}}>
                    <Box sx={{display: 'flex', gap: 2, flexWrap: 'nowrap', width: 'max-content'}}>
                        {recommendedFriends.map(user => <RecommendedFriendCard key={user.name} user={user}/>)}
                    </Box>
                </Box>}
        </Box>
    );
}