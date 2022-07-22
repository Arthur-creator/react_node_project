const { Router } = require("express");
const { body, validationResult } = require('express-validator');
const { createToken } = require("../lib/jwt");
const { User } = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();
// const jwt = require("jsonwebtoken");
const nodemailer = require("../configs/nodemailer.config");
const controller = require("../controller/registrationController");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({
        email: "Email not found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(401).json({
        password: "Password is incorrect",
      });
    }

    if (user.isVerified !== true) {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    res.json({
      token: createToken(user),
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post(
    "/register",
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 20 }),
    body('firstname').isString(),
    body('lastname').isString(),
    async (req, res) => {
      try {

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
            user.username,
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

router.get("/api/auth/confirm/:confirmationCode", controller.verifyUser)

module.exports = router;
