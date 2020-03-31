require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const authRoutes = require('./routes/auth.routes')
const session = require("express-session");
const flash = require("connect-flash");
let passport = require("./helper/ppConfig");
const artItemRoute = require('./routes/artItems.routes');
const toutRoutes = require('./routes/tours.routes')
const PORT = process.env.PORT;

const app = express();



mongoose.connect(
    process.env.mongoDBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("mongodb running!");
    },
    err => {
        console.log(err);
    }
);

//Middleware section
{
    //tells express to look in public for static files
    app.use(express.static('public'))

    app.use(express.urlencoded({ extended: true }))
    app.set("view engine", "ejs")
    app.use(expressLayouts)



    //These lines of code should be in order, and before routes
    {
        app.use(session({
            secret: process.env.SECRET,
            saveUninitialized: true,
            resave: false,
            // cookie: { maxAge: 360000 }  //If omitted, the session will last till the user logs outs
        }))

        app.use(passport.initialize());
        app.use(passport.session());
    }

    //This must come after the session code
    app.use(flash());


    //Makes certian variables accessible to the rest of the application
    app.use(function (req, res, next) {
        res.locals.alerts = req.flash(); //Displays one time messages
        res.locals.currentUser = req.user;
        next();
    });

    app.use(authRoutes)
    app.use(artItemRoute);
    app.use(toutRoutes)
    
}
app.get('*', (req, res) => {
    res.send("doesn't exit yet!")
})

app.listen(PORT, () => console.log(`Express running on ${PORT}`))
