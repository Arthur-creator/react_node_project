import Header from './components/layout/Header'
import {Container} from "@mui/material";
<<<<<<< HEAD
import Router from "./routes/Router";
import React from 'react';
import UserProvider, {UserContext} from "./components/provider/AuthProvider";
import {Routes, Route} from 'react-router-dom'
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import {Suspense} from "react";


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
