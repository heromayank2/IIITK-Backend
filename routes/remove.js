const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const passport = require("passport");
var auth = require("./auth");

router.get('/faculty',(req,res)=>{
    let token = req.query.token;
    Faculty.find({}).then((faculties)=>{
        let viewData = {
            title: 'Remove Faculty',
            viewName: 'rfaculty',
            token:token,
            faculties
          };
        res.render(viewData.viewName,viewData)
    })
})

router.post('/faculty',(req,res)=>{
    let token = req.query.token;
    const {
        body:{
            _id
        }
    } = req
    Faculty.findByIdAndDelete({_id:_id}).then(()=>{
        res.redirect('/dashboard?token='+token+'&?message=Deleted a faculty')
    })
})

module.exports = router;