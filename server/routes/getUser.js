const { Router } = require("express");
const { User, Friends} = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

router.get("/users", async (req, res) => {
    try {
        const users = await User.findAll({ where: req.query });
        res.json(users);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(user);
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.get('/friends/:id',async(req,res)=> {
    try {
        const friends = await Friends.findAll({where:req.query});
        if (!friends) {
            res.sendStatus(404);
        } else {
            res.json(friends);
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
}) ;

module.exports = router;
