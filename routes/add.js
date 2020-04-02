const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const passport = require("passport");
var auth = require("./auth");

router.get('/faculty',(req,res)=>{
    let token = req.query.token;
    let viewData = {
        title: 'Faculty',
        viewName: 'faculty',
        token:token
      };
    res.render(viewData.viewName,viewData)
})

router.post('/faculty',(req,res)=>{
    const {
        body:{
            name,role,department,phonenumber,mail,photourl,description,gspl,twitter,facebook,linkedin,rs1,rs2,rs3,rs4,rs5,rs6,rs7,rs8,rs9,rs0,p0,p1,p2,p3,p4,p5,p6,p7,p8,p9
        }
    } = req
    var research_intersts = [rs0,rs1,rs2,rs3,rs4,rs5,rs6,rs7,rs8,rs9]
    var publications = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9]
    console.log(research_intersts)
    let faculty = {
        name,role,department,phonenumber,mail,photourl,description,gspl,twitter,facebook,linkedin,research_intersts,publications
    }
    const newfaculty = new Faculty(faculty);
    var token = req.query.token
    return newfaculty
    .save()
    .then(() => res.redirect('/dashboard?token='+token+'&?message=New faculty '+name+' is added'));

})


module.exports = router;