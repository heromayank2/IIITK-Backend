const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const passport = require("passport");
var auth = require("./auth");

router.post('/faculty/',(req,res)=>{
    const {
        body:{} = req
    }

})

