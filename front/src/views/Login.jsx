import {Card, Checkbox, FormControlLabel, Stack, TextField, Button, CardContent, Grid, Typography} from "@mui/material";
import { grey } from "@mui/material/colors";
import {NavLink} from "react-router-dom";

export default function Login() {
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                paddingTop={10}>
                <Card sx={{maxWidth: '400px', width: '100%'}}>
                    <CardContent>
                        <Typography variant="h4">Login</Typography>
                        <Typography color={grey[500]} marginBottom={3}>Join the community!</Typography>
                        <Stack spacing={2}>
                            <TextField id="outlined-basic" label="Email" variant="outlined"/>
                            <TextField id="outlined-basic" label="Password" variant="outlined"/>
                            <FormControlLabel
                                value="end"
                                control={<Checkbox/>}
                                label="I accept the Terms and Conditions"
                                labelPlacement="end"
                            />
                            <Button variant="contained">Log in</Button>
                        </Stack>
                        <Stack direction="row" spacing={2} paddingTop={3}>
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/forgot-password">Forgot password</NavLink>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}