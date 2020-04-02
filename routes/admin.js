const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const passport = require("passport");
var auth = require("./auth");

router.post("/", auth.optional, (req, res) => {
  const {
    body: { admin }
  } = req;
  if (!admin.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!admin.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const demoAdmin = new Admin(admin);
  demoAdmin.setPassword(admin.password);
  return demoAdmin
    .save()
    .then(() => res.json({ admin: demoAdmin.toAuthJSON() }));
});

router.post("/login", auth.optional, (req, res) => {
  const {
    body: { username,password }
  } = req;
    const admin ={
      username:username,
      password:password
    }
  if (!admin.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!admin.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }
  Admin.findOne({ username: admin.username }).then(dbAdmin => {
    if (dbAdmin) {
      if (dbAdmin.validatePassword(admin.password)) {
        const admin = dbAdmin;
        admin.token = dbAdmin.generateJWT();
        console.log(admin.token)
        var token = admin.token
        // Cookies.set('token',token);
        return res.redirect('/dashboard?token='+token)
      }
    } else {
      return res.send(404);
    }
  });
});

router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id }
  } = req;

  return Admin.findById(id).then(admin => {
    if (!admin) {
      return res.sendStatus(400);
    }

    return res.json({ admin: admin.toAuthJSON() });
  });
});

module.exports = router;
