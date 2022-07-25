const {Router} = require('express') ;
const { Message } = require("../models/mongo");
const mongoose = require("mongoose");
const router = new Router() ;

const errors = (validationError) => {
    return Object.key(validationError.errors).reduce((acc,key)=>{
        acc[key] = validationError.errors[key].message;
        return acc ;
    },{}) ;
};

router.get('/',async(req,res)=>{
    try{
        const messages = await Message.findAll(req.query) ;
        res.json(messages) ;
    }catch (e) {
        console.error(e);
        res.sendStatus(500) ;
    }
}) ;

router.get('/:id',async (req,res)=>{
    try {
        const message = await Message.findOne({
            _id: req.params.id
        }) ;
        if(message)
            res.sendStatus(404) ;
        else res.json(message) ;
    } catch (e) {
        console.error(e) ;
        res.sendStatus(500) ;
    }
}) ;

router.post('/',async(req,res) => {
    try {
        const message = await Message.create(req.body) ;
        res.status(201).json(message) ;
    } catch (e) {
        if(e instanceof mongoose.Error.ValidationError)
            res.status(422).json(errors(e)) ;
        else {
            console.error(e) ;
            res.sendStatus(500) ;
        }
    }
});

router.put('/:id',async(req,res)=> {
    try {
        const message = await Message.findOneAndUpdate({
            id: req.params.id
        },{$set: req.body});
        if(!message)
            res.sendStatus(404) ;
        else res.json(message) ;
    } catch(e) {
        if(e instanceof mongoose.Error.ValidationError)
            res.status(422).json(errors(e)) ;
        else {
            console.error(e) ;
            res.sendStatus(500) ;
        }
    }
}) ;

router.delete('/:id',async(req,res) => {
    try {
        const message = await Message.findOneAndRemove({
            _id: req.params.id,
        }) ;
        if(!message) res.sendStatus(404) ;
        else res.sendStatus(204) ;
    } catch (e) {
        console.error(e) ;
        res.sendStatus(500) ;
    }
}) ;

module.exports = router ;

