import {Button, TextField} from "@material-ui/core";
import {FormControl, Grid, OutlinedInput, Select, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

export const EditAccount = () => {
    const userUrl = window.location.pathname;
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);
    const [initialValues,setInitialValues] = useState({});
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const proposedTechnologies =  ["adonisjs", "aftereffects", "amazonwebservices", "android", "androidstudio", "aarch64", "angularjs",
        "ansible",    "apache",
        "apachekafka",
        "appcelerator",
        "apple",
        "appwrite",
        "arduino",
        "atom",
        "azure",
        "babel",
        "backbonejs",
        "bamboo",
        "dropwizard",
        "vuetify",
        "fedora"
    ] ;

    useEffect(() => {
        fetch('http://localhost:4000/api/'+userUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImF1c2Vjb3VycyIsImlhdCI6MTY1ODY4NTM2MCwiZXhwIjoxNjkwMjQyOTYwfQ.DiPfuOFyoeNYuBKFwQksDC55rTydfMDW8eht-xRrWZm4xykr0Aj0GbtSne7pypGxkDO6tuFVB5SU_Lvyep33Ew',
            }
        }).then(res => res.json())
            .then(data => setUser(data))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setInitialValues({
            firstname: user ? user.firstname : "",
            lastname: user ? user.lastname : "",
            age: user ? user.age : "",
            password: ""
        })
    }, [user])

    const editField = (newValue) => {
        const fieldName = newValue.target.name;
        setInitialValues(
            {
                ...initialValues,
                [fieldName]: newValue.target.value,
            }
        );
    }

    const sendData = () => {
        /* delete password from initialValues if empty */
        if (initialValues.password === "") {
            delete initialValues.password;
        }
        fetch('http://localhost:4000/api/'+userUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               ...initialValues,
                'technos': personName.join('0')
            })
        }).then(res => res.json())
            .then(data => setUser(data))
            .finally(() => console.log("done"))
    }

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        !loading &&
        <>
            <h2>Modification de l'utilisateur</h2>
            <Grid container>
                <Grid item xs={12} padding={3}>
                    <TextField label="Prénom" name="firstname" variant="outlined" fullWidth value={initialValues.firstname} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Grid item xs={12} padding={3}>
                    <TextField label="Nom" name="lastname" variant="outlined" fullWidth value={initialValues.lastname} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Grid item xs={12} padding={3}>
                    <TextField label="Age" name="age" variant="outlined" fullWidth value={initialValues.age} onChange={newValue => editField(newValue)}/>
                </Grid>
                <Grid item xs={12} padding={3}>
                    <TextField type="password" label="Password" name="password" variant="outlined" fullWidth value={initialValues.password} onChange={newValue => editField(newValue)}/>
                </Grid>

                <Grid item xs={12} padding={3}>
                    <div>
                        <FormControl sx={{ m: 15, width: 300, mt: 3 }}>
                            <Select
                                multiple
                                displayEmpty
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Choisir ses technologies préférées</em>;
                                    }
                                    return selected.join(', ');
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                    <MenuItem disabled value="">
                                        <em>Choisir ses technologies préférées</em>
                                    </MenuItem>
                                    {proposedTechnologies.map((name) => (
                                        <MenuItem  style={{fontWeight:'500px'}}  key={name}  value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>

                <Button variant="contained" onClick={sendData}>Envoyer</Button>
            </Grid>
        </>
    )
}