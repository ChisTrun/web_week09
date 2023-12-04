const User = require('../models/acc.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

module.exports = {
    getLogin: async (req, res, next) => {
        try {
            let success = true;
            if (req.params.success) success = JSON.parse(req.params.success);
            res.render('login', {host: process.env.HOST,port: process.env.PORT ,success: success });
        } catch (error) {
            next(error);
        };
    },

    getSignup: async (req, res, next) => {
        try {
            let success = true;
            if (req.params.success) success = JSON.parse(req.params.success);
            res.render('signup', {host: process.env.HOST,port: process.env.PORT, success: success });
        } catch (error) {
            next(error);
        };

    },

    postLogin: async (req, res, next) => {
        try {
            req.session.auth = false;
            const loginData = req.body;
            let user = await User.findUser(loginData.username);
            if (user != undefined) {
                await bcrypt.compare(loginData.password, user.password).then(function(result) {
                    req.session.auth = result;
                });
            } 
            if (!req.session.auth) {
                res.redirect('http://localhost:3000/acc/login/false');
            } else {
                req.session.permission = 1;
                req.session.user = user;
                if (Boolean(loginData.remember)) req.session.cookie.expires = new Date(Date.now() + 36000000);
                res.redirect('http://localhost:3000/admin');
            }
        } catch (error) {
            next(error);
        };
    },

    postSignup: async (req, res, next) => {
        try {
            let addRs = false;
            let signUpData = req.body;
            let checkUser = await User.findUser(signUpData.username);
            if (checkUser == undefined) {
                signUpData.permission = 1;
                await bcrypt.hash(signUpData.password, saltRounds).then(function (hash) {
                    console.log(hash)
                    console.log(typeof hash)
                    signUpData.password = hash;
                });
                console.log(signUpData);
                addRs = await User.addUser(signUpData);
                res.redirect('http://localhost:3000/acc/login');
            } else {
                res.redirect('http://localhost:3000/acc/signup/false');
            }
        } catch (error) {
            next(error);
        };
    },

    postLogout: async (req,res,next) => {
        try {
            req.session.destroy();
            res.redirect('http://localhost:3000/acc/login');
        } catch(error) {
            next(error);
        }
    }

}