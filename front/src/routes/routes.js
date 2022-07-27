import React, {lazy} from "react";
import Home from "../views/Home";
import Chat from "../views/Chat";
import UserProfile from "../views/UserProfile";

const { body, validationResult } = require('express-validator');
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("../configs/nodemailer.config");
const {generateAccessToken, generateRefreshToken} = require("../lib/jwt");

let refreshTokens = [];

router.get('/user/by/:id',async (req,res) => {
    try {
        const user = await User.findOne({ where: {id : req.params.id} }) ;
        if(!user)
            res.status(404) ;
        else res.json(user) ;
    } catch(error) {console.error(error); res.sendStatus(500) ;}


}) ;

router.post("/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;

    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });

    //if everything is ok, create new access token, refresh token and send to user
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(401).json({
                message: "Your email or password is incorrect",
            });
        }

        const isValid = await bcryptjs.compare(req.body.password, user.password);
        if (!isValid) {
            return res.status(401).json({
                message: "Your email or password is incorrect",
            });
        }

        if (user.isVerified !== true) {
            return res.status(401).send({
                message: "Pending Account. Please Verify Your Email!",
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

router.post(
    "/register",
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 20 }),
    body('confirmPassword').isLength({ min: 8, max: 20 }),
    body('firstname').isString(),
    body('lastname').isString(),
    async (req, res) => {
        try {

            const checkUser = await User.findOne({ where: { email: req.body.email } });

            if (checkUser) {
                const message = {
                    message: "Account already exists. Please login or verify your email !",
                };
                return res.status(400).json(message);
            }

            if (req.body.password !== req.body.confirmPassword) {
                const message = {
                    message: "Passwords do not match",
                };
                return res.status(400).json(message);
            }

            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let token = '';
            for (let i = 0; i < 25; i++) {
                token += characters[Math.floor(Math.random() * characters.length )];
            }

            // const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET,
            // {
            //     expiresIn: "30m"
            // });
            const confirmationCode = {
                confirmationCode: token,
            }
            const userWithToken = {
                ...req.body,
                ...confirmationCode
            };
            const user = await User.create(userWithToken);
            nodemailer.sendConfirmationEmail(
                user.firstname + " " + user.lastname,
                user.email,
                user.confirmationCode
            );
            const message = {
                message: "Please check your email to confirm your account",
            };
            res.status(201).json(message);
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.array() });
                }
            } else {
                res.sendStatus(500);
                console.error(error);
            }
        }
    }
);

router.get("/confirm/:confirmationCode", async (req, res) => {
    try {
        await User.update(
            {
                isVerified: true,
            },
            {
                where: { confirmationCode: req.params.confirmationCode },
            }
        );

        return res.status(200).json({
            message: "Account Verified"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;



const routes = [
    {
        name: 'home',
        path: '/',
        component: () => <Home/>,
        meta: {},
    },
    {
      name: 'chat',
      path: '/chat',
      component: () => <Chat/>,
      meta: {}
    },
    {
        name:'userProfile',
        path: '/profile',
        component: <UserProfile/> ,
        meta: {}
    },
    {
        name: 'notFound',
        path: '*',
        component: lazy(() => import('../views/NotFound.jsx')),
        meta: {},
    },

];

export default routes;