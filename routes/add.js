const express = require("express");
const router = express.Router();

const Faculty = require("../models/Faculty");
const Notice = require("../models/Notice")
const News = require('../models/News')
const Article = require('../models/Article')
const passport = require("passport");
var auth = require("./auth");

router.get('/faculty',auth.required,(req,res)=>{
    let token = req.query.token;
    let viewData = {
        title: 'Faculty',
        viewName: 'faculty',
        token:token
      };
    res.render(viewData.viewName,viewData)
})

router.post('/faculty',auth.required,(req,res)=>{
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
    .then(() => res.redirect('/dashboard?token='+token+'&?created=Faculty'));

})

router.post('/notice',auth.required,(req,res)=>{

    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress

    const {
        body:{
            title,description,validity
        }
    } = req
    var notice ={
        title,description,validity,ip
    }
    const newNotice = new Notice(notice);
    var token = req.query.token
    return newNotice
    .save()
    .then(() => res.redirect('/dashboard?token='+token+'&?created=Notice'));
})

router.post('/news',auth.required,(req,res)=>{

    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress || 
    req.connection.socket.remoteAddress

    const {
        body:{
            title,description,photourl
        }
    } = req
    var news ={
        title,description,photourl,ip
    }
    const newNews = new News(news);
    var token = req.query.token
    return newNews
    .save()
    .then(() => res.redirect('/dashboard?token='+token+'&?created=News'));
})

router.get('/article',(req,res)=>{
    let token = req.query.token;
    let viewData = {
        title: 'Article',
        viewName: 'article',
        token:token
      };
    res.render(viewData.viewName,viewData)
})

router.post('/article',(req,res)=>{
    let token = req.query.token;
    const {
        body:{
            title,imageurl1,imageurl2,paragraph1,paragraph2,paragraph3,paragraph4,author
        }
    } = req;
    var article ={
        title,imageurl1,imageurl2,paragraph1,paragraph2,paragraph3,paragraph4,author
    }
    var newArticle = new Article(article)
    return newArticle
    .save()
    .then(() => res.redirect('/dashboard?token='+token+'&?created=Article'));
})

module.exports = router;