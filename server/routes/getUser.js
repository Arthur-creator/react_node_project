const { Router } = require("express");
const { User } = require("../models/postgres");
const { Op } =  require("sequelize");
const { User, Friends} = require("../models/postgres");
const { ValidationError, Op } = require("sequelize");


const router = new Router();

router.get("/search-users", async (req, res) => {
    if(!req.query.q) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    };
    const [fName, lName] = req.query.q.split(" ");
    try {
        const users = await User.findAll({
            where: {
                firstname: { [Op.like]: `%${fName}` },
                lastname: { [Op.like]: `%${lName}` },
              },
        });
        return res.json(users);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

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

module.exports = router;
