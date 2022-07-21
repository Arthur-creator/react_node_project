const { Router } = require("express");
const { Message, User } = require('../models/postgres') ;
const { ValidationError } = require("sequelize");

const router = new Router() ;

// GET all messages send by one user
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

// Get all messages send by one user to another user
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

// Send a new message to one user
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

router.put("/users/:id/messages", async (req,res) => {
    try {
        const [, lines] = await Message.update(req.body, {
            where: {id: req.params.id},
            returning: true,
            individualHooks: true
        }) ;
        if(!lines[0]) res.sendStatus(404) ;
        else res.json(lines[0]) ;
    }catch (e) {
        if(e instanceof ValidationError) {
            console.error(e) ;
            res.status(422).json({
                text: 'must not be empty'
            }) ;
        } else {
            console.error(e) ;
            res.sendStatus(500) ;
        }
    }
}) ;

router.delete("/users/:id/message", async (req,res)=> {
    try {
        const nbLines = await Message.delete({where: {id: req.params.id}}) ;
        if(!nbLines) res.sendStatus(404) ;
        else res.sendStatus(204) ;
    } catch (e) {
        console.error(e) ;
        res.sendStatus(500) ;
    }
}) ;

module.exports = router ;
