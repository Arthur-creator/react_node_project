import {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import styles from './SearchInput.module.css';
import {useNavigate} from "react-router-dom";


export default function SearchInput() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        console.log(search.length)
        if (search.length === 0) {
            setUsers([]);
        }
        if (search.length > 3) {
            console.log('fetch for', search);
            // fetch(`/api/users?search=${value}`);
            setUsers([{
                name: 'Antoine Daniel',
                id: '234',
                avatar: 'AD',
                class: '4IW3',
                topics: ['React', 'NodeJS', 'MongoDB'],
            }, {
                name: 'Hans Burger',
                id: '12',
                avatar: 'HB',
                class: '4IW1',
                topics: ['Vue', 'Django', 'Redis'],
            }]) // Set with the fetch result
        }
    }, [search]);

    const onSearch = (query) => {
        navigate(`/search?q=${query}`);
    }

    const handleKeydown = (event) => {
        if (event.key === 'Enter') {
            onSearch(search);
        }
    }

    return (
        <div>
            <Autocomplete
                freeSolo
                disableClearable
                inputValue={search}
                onInputChange={(event, newInputValue) => {
                    setSearch(newInputValue);
                }}
                onChange={(event, newValue) => onSearch(newValue)}
                onKeyDown={handleKeydown}
                options={users.map((option) => option.name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Search..."
                        sx={{
                            width: "200px",
                        }}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </div>
    );
}