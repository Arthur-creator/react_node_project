import Header from './components/layout/Header'
import {Container} from "@mui/material";
import Router from "./routes/Router";
import React from 'react';
import axios, {post} from "axios";
import jwt_decode from "jwt-decode";
import UserProvider, {UserContext} from "./components/provider/AuthProvider";

function App() {

    return (
        <UserProvider>
            <div className="App">
                <Header/>
                <Container maxWidth="lg">
                        <Router/>
                </Container>
            </div>
        </UserProvider>
    )
}

export default App
