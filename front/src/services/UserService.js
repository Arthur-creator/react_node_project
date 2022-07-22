import {get, post} from "axios";

const headers = {
    'Content-Type': 'application/json'
};

export const registerUser = async (user) => {
    return post("http://localhost:4000/register", user, { headers })
        .then(response => console.log(response))
        .catch(error => {
            console.log(error);
        });
}

export const verifyUser = (code) => {
    return get("http://localhost:4000/confirm/" + code).then((response) => {
        return response.data;
    });
};