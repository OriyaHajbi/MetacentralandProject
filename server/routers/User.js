const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const saltRounds = 10;



const User = require("../models/User");


//get user
router.get("/user", async function (req, res) {
    const username = req.query.username;
    User.find({
        username: username
    }, function (err, foundUser) {
        if (foundUser) {
            res.send(foundUser);
        }else{
            res.send(null);
        }
    });

});

//register new user
router.post("/register", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const isSeller = req.body.isSeller;
    var balance = 1000;

    if (isSeller === "false")
        balance = -1;

    //console.log(balance);

    User.find({
        username: username
    }, function (err, foundUser) {
        if (foundUser) {
            res.send("User exist");
        }else{
              bcrypt.hash(password, saltRounds, function (err, hash) {
                const newUser = new User({
                    username: username,
                    password: hash,
                    isSeller: isSeller,
                    balance: balance
                });
        //console.log(newUser);

            newUser.save();
        return res.json(newUser);
    });
        }
    });
});


//login user USER
router.get("/login", async function (req, res) {

});

//Delete all users
router.post("/delete", async function (req, res) {
    User.deleteMany({});
});





//login into user
router.post("/login", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username: username
    }, function (err, foundUser) {
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, function (err, result) {
                if (result === true) {
                    return res.json(foundUser);
                } else {
                    return res.json(null);
                }
            })
        } else {
            return res.json(null);
        }

    })

});



module.exports = router;