const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const passport = require("passport");
var auth = require("./auth");

router.get('/faculty',(req,res)=>{
    let token = req.query.token;
    Faculty.findById({}).then((faculties)=>{
        return res.json({faculties})
    })
})

module.exports = router;
