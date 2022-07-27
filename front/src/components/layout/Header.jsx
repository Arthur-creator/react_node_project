import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link, Stack} from "@mui/material";
import {UserContext} from "../provider/AuthProvider";
import {useNavigate} from "react-router-dom";
import SearchInput from "./Header/SearchInput";


export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const {user, setUserInfo} = useContext(UserContext);

    const navigate = useNavigate();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRedirectMenu = (route) => {
        navigate(route);
        handleMenuClose()
    }

    const handleLogout = () => {
        handleMenuClose();
        handleMobileMenuClose();
        setUserInfo(null);
        navigate('/login');
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Stack>
                <MenuItem onClick={() => handleRedirectMenu('/profile')}>My Account</MenuItem>
                <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
            </Stack>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <Stack>
                    <MenuItem onClick={() => handleRedirectMenu('/profile')}>My Account</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
                </Stack>

            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Link onClick={()=> {navigate('/')}}>
                        <Typography
                            variant="h6"
                            color="white"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}>
                            Techie
                        </Typography>
                    </Link>
                    <SearchInput/>
                    <Link onClick={() => navigate('/chat')} style={{cursor:"pointer"}}>
                        <Typography
                            color="white"
                            padding={2}
                        >
                            Messages
                        </Typography>
                    </Link>
                    {
                        user && user.isAdmin === true &&
                        <Link onClick={() => navigate('/admin')} style={{cursor:"pointer"}}>
                            <Typography
                                color="white">
                                Admin
                            </Typography>
                        </Link>
                    }
                    {user &&
                        <>
                            <Box sx={{flexGrow: 1}}/>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current

                                    "
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                            </Box>
                            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon/>
                                </IconButton>
                            </Box>
                        </>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
