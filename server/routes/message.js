const { Router } = require("express");
const { Message, User } = require('../models/postgres') ;
const { ValidationError } = require("sequelize");

const router = new Router() ;

router.get('/users/:id/messages', async (req,res) => {
    try {
        const messages = await Message.findAll( {
            authorId: req.params.id
        }) ;
        if(messages)
            res.json(messages) ;
        else res.sendStatus(404) ;
    } catch (e) {
        res.sendStatus(500) ;
        console.error(e) ;
    }
}) ;

router.get('/users/:uid/messages/to/:id', async (req,res) => {
    try {
        const messages = await Message.findAll({
            authorId : req.params.uid,
            sendToId : req.params.id
        }) ;
        if(messages)
            res.json(messages) ;
        else res.sendStatus(404) ;
    } catch (e) {
        res.sendStatus(500) ;
        console.error(e) ;
    }
})

router.post("/users/:id/messages", async (req, res) => {
    try {

        const message = await Message.create({
            authorId: parseInt(req.params.id),
            ...req.body}) ;
        res.status(201).json(message) ;
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
}) ;

module.exports = router ;
