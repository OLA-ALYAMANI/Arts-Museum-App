const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../helper/ppConfig");
const isLoggedIn = require("../helper/isLoggedIn");
const { check, validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
let salt = 10;

//Home routes
{
    router.get("/", (req, res) => {
        res.render("home");
    });

    router.get("/home", (req, res) => {
        res.render("home");
    });
}


//Signup routes
{
    router.get("/auth/signup", (req, res) => {
        res.render("auth/signup");
    });

    router.post(
        "/auth/signup",
        [
            check("firstName").isLength({ min: 3 }),
            check("lastName").isLength({ min: 3 }),
            check("email").isEmail(),
            check("password").isLength({ min: 6 })
        ],
        (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                req.flash("autherror", errors.errors);
                return res.redirect("/auth/signup");
            }


            let user = new User(req.body);

            user
                .save()
                .then(() => {
                    //user login after registration
                    passport.authenticate("local", {
                        successRedirect: "/home",
                        successFlash: "Account created successfully!"
                    })(req, res);
                })
                .catch(err => {
                    if (err.code == 11000) {
                        req.flash("error", "Email already exists!");
                        return res.redirect("/auth/signup");
                    }
                    res.send("error!!!");
                });
        });
}

//Signin routes
{
    router.get("/auth/signin", (req, res) => {
        res.render("auth/signin");
    });

    router.post(
        "/auth/signin",
        passport.authenticate("local", {
            successRedirect: "/home",
            failureRedirect: "/auth/signin",
            failureFlash: "Invalid email or password",
            successFlash: "You have logged in!"
        })
    );
}

//Sign out route
router.get("/auth/signout", (req, res) => {
    req.logOut() //clear and break session
    req.flash("success", "Logout was successful.");
    res.redirect('/auth/signin')
});


//Profile route
router.get("/auth/profile", isLoggedIn, (req, res) => {

    User.findById(req.user._id).populate({path: 'bookedTours', populate:{path: 'tourGuide'}}).then(user => {
        res.render("auth/profile", {bookedTours: user.bookedTours});
    })

})

//Change password routes
{
    router.get("/auth/editPassword", isLoggedIn, (req, res) => {
        res.render("auth/editPassword");
    })

    router.post('/auth/editPassword', [
        check("newPassword").isLength({ min: 6 }, "The new password must be at least 6 characters long.")
    ], isLoggedIn, (req, res) => {
        let body = req.body;
        let redirectionLink = "/auth/editPassword";
        let message = "";
        let messageType = "error";

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            messageType = "autherror";

            req.flash(messageType, errors.errors);
            return res.redirect(redirectionLink);

        }
        User.findById(req.user._id).exec(function (err, user) {

            if (user.verifyPassword(body.oldPassword)) {
                if (!user.verifyPassword(body.newPassword)) {


                    user.updatePassword(body.newPassword);

                    user.save()

                    redirectionLink = "/auth/profile";
                    message = "Password has been changed.";
                    messageType = "success";


                } else {
                    message = "New password cannot match the old password!";
                }
            } else {
                message = "The old password does not match!";
            }
            req.flash(messageType, message);
            return res.redirect(redirectionLink);

        });

    })
}


module.exports = router;