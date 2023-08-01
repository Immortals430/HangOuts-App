const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose')
const ExpressLayout = require('express-ejs-layouts');
const sass = require('node-sass-middleware')

const session = require('express-session');
const Mongostore = require('connect-mongo')(session)
const cookieParser = require('cookie-parser');
const passport = require('./config/passportLocal');

const path = require('path');
const env = require('./config/environment')
const logger = require('morgan')

require('./config/view-helpers')(app)



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(logger(env.morgan.mode, env.morgan.options))

app.use(express.urlencoded({extended: false}));
app.use(ExpressLayout);
app.use(cookieParser());
app.use(express.static(env.asset_path))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(sass({
    src: path.join(__dirname, env.asset_path, 'sass' ),  // where to pick up scss files for conversion
    dest: path.join(__dirname, env.asset_path, 'css' ),  // where top put converted files
    debug: true,
    outputStyle: 'extended',  // multiple line will be used not compressed one
    prefix: '/css'  // will fetch css file with this prefix
}))

app.use(session({
    name: 'coding ninjas project',
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 6000000
     },
     store: new Mongostore({
         mongooseConnection: db,
         autoRemove: 'disabled'
     })
  }));


app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use('/', require('./routes/api/v1'));


app.listen(8000, ()=>{
    console.log(`Server Connected at port: ${port}`);
})