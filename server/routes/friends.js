const { Router } = require("express");
const { User, Friends} = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

router.post('/friends', async (req, res) => {
    try {
        const friend = await Friends.create({
            user_id: req.body.user_id,
            friend_id: req.body.friend_id
        });
        res.status(201).json(friend) ;
    } catch (e) {
        if(e instanceof  ValidationError) {
            res.status(422).json({
                text: "must not be empty",
                sendToId: "you must define a person to send the message"
            }) ;
        } else {
            console.error(e) ;
            res.sendStatus(500) ;
        }
    }
})

router.get('/friends/:id',async(req,res)=> {
    try {
        const friends = await Friends.findAll({ where: req.query});
        const populatedFriend = friends.map(async ({dataValues}) => {
            const friend = await User.findOne({where: { id: dataValues.friend_id }});
            return friend.dataValues;
        })
        if (!friends) {
            res.sendStatus(404);
        } else {
            res.json(await Promise.all(populatedFriend));
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

module.exports = router;
