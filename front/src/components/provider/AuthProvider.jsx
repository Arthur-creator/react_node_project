import {createContext, useEffect, useState} from "react";
import axios, {post} from "axios";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export const UserContext = createContext({});

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem('user-access-token')) ;
    const axiosJWT = axios.create();
    const navigate = useNavigate() ;
    const [loader, setLoader] = useState(true) ;

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


    useEffect(()=>{
        if(!loader) {
            if(!user && !token) {
                if(window.location.pathname !== "/register"  )
                    navigate('/login') ;
            }
        } else {
            if(token) {
                fetch('http://localhost:4000/user/by/'+token).then( async (res)=>{
                    const user = await res.json() ;
                    if(user) setUser(user) ;
                    setLoader(false) ;
                }) ;
            } else setLoader(false) ;
        }
    },[user,loader]);

    const setUserInfo = (info) => {
        setUser(info) ;
        if (info === null) {
            localStorage.removeItem("user-access-token");
            localStorage.removeItem("token");
        }
        else {
            localStorage.setItem('token', info.accessToken) ;
            localStorage.setItem('user-access-token',info.id) ;
        }
    };

    return loader === false ? <UserContext.Provider value={{ user, setUserInfo }}>{children}</UserContext.Provider> : 'Loading...'
} ;

export default UserProvider ;