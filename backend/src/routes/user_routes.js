const express = require('express')
const router = express.Router();
const User = require("./../models/user_model");

router.get("/", function(req,res){
    User.findAll(function(err,rows){
        if(err){
            res.json(err)
        }
        else{
            res.json(rows)
        }
    })
});

router.post("/create",function(req,res){
    User.create(req.body,function(err,count){
        if(err){

            res.json(err);
        }
        else
        {
            res.send({
                error:"false",
                message:"User added successfully"
            });
        }
    })
});

router.get("/reward/:id", function(req,res){
    User.findReward(req.params.id,function(err,rows){
        if(err){
            res.json(err)
        }
        else{
            res.json(rows)
        }
    })
});

router.get("/p5/:id", function(req,res){
    User.findP5(req.params.id,function(err,rows){
        if(err){
            res.json(err)
        }
        else{
            res.json(rows)
        }
    })
});

router.post("/create/p5",function(req,res){

    User.createp5(req.body,function(err,count){
        if(err){

            res.json(err);
        }
        else
        {
            res.send({
                error:"false",
                message:"P5 tranaction done successfully"
            });
        }
    })
    
})
module.exports = router;