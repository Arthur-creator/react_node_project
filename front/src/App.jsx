import Header from './components/layout/Header'
import {Container} from "@mui/material";
import Router from "./routes/Router";
import React from 'react';
import axios, {post} from "axios";
import jwt_decode from "jwt-decode";

export const UserContext = React.createContext();

function App() {
    const [user, setUser] = React.useState(null);

    const refreshToken = async () => {
        try {
            const res = await post("http://localhost:4000/refresh", { token: user.refreshToken });
            console.log("bonjour");
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (
        <UserContext.Provider value={[user, setUser]}>
            <div className="App">
                <Header/>
                <Container maxWidth="lg">
                    <Router/>
                </Container>
            </div>
        </UserContext.Provider>
    )
}

export default App
