import {useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MessageIcon from '@mui/icons-material/Message';
import ReportIcon from '@mui/icons-material/Report';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@mui/material";
import Users from "./AdminTabs/Users";
import Messages from "./AdminTabs/Messages";
import Reports from "./AdminTabs/Reports";
import Analytics from "./AdminTabs/Analytics";

export default function Admin() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography variant={"h2"} textAlign={"center"} p={5}>Modération</Typography>
                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" variant={"fullWidth"}>
                    <Tab icon={<PersonPinIcon />} label="Utilisateurs" />
                    <Tab icon={<ReportIcon />} label="Utilisateurs reportés" />
                    <Tab icon={<MessageIcon/>} label="Messages Instantanés" />
                    <Tab  label="Analytics" />
                </Tabs>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    { value === 0 && <Users/> }
                    { value === 1 && <Reports/> }
                    { value === 2 && <Messages/> }
                    { value === 3 && <Analytics/>}
                </Grid>
            </Grid>
        </>

    );
}
