import {get, post} from "axios";

const headers = {
    'Content-Type': 'application/json'
};

export const loginUser = async (user) => {
    return await post("http://localhost:4000/login", user, {headers})
        .then(res => res.data)
}

export const registerUser = async (user) => {
    return await post("http://localhost:4000/register", user, {headers})
        .then(res => res.data)
}

export const verifyUser = async (code) => {
    return await get("http://localhost:4000/confirm/" + code)
        .then(res => res.data)
};