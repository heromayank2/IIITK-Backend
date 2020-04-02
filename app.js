const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const mongoose = require("mongoose");

const index = require('./routes/index');
const upload = require('./routes/upload');
const admin = require('./routes/admin')

var cors = require("cors");

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(cookieParser())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 40000 },
    resave: false,
    saveUninitialized: false
  })
);


// MongoDB Configuration
const db = 'mongodb+srv://iiitkota:iiitkota@iiitkota-rhdtk.mongodb.net/test?retryWrites=true&w=majority'
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
  
mongoose.set("debug", true);


require("./config/passport");


app.use('/', index);
app.use('/upload', upload);
app.use('/admin',admin)




// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
