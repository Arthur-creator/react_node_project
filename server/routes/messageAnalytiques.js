const {Router} = require('express') ;
const { Message } = require("../models/mongo");
const mongoose = require("mongoose");
const router = new Router() ;

router.get('/total',async (req,res) => {
    try{
        const total = await Message.count() ;
        if(total) res.json(total) ;
        else res.sendStatus(404) ;
    }catch (error) {
        console.error(500);
        res.sendStatus(500);
    }
}) ;

router.get('/total-per-users',async (req,res) => {
    try{
        const moy = await Message.aggregate([
            {$group:{
                _id: {author:'$author.email',message:'$id'}
            }},
            {$group:{
                _id:'$_id.author',
                    total:{$count:{}}
            }}
        ]) ;
        if(moy) res.json(moy) ;
        else res.sendStatus(404) ;
    }catch (error) {
        console.error(500);
        res.sendStatus(500);
    }
}) ;

module.exports = router ;