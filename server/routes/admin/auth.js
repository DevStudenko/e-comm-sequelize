const express = require('express');
const { check, validationResult } = require('express-validator');

const { User } = require('../../db/models');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res, next) => {
    return res.send(signupTemplate({ req: req }));
});

router.post('/signup', [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
],
    async (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
        try {
            const { passwordConfirmation, email, password } = req.body;
            const hashedPassword = await User.hashPassword(password);
            //Create a new user and save their id
            const user = await User.create({
                email,
                password: hashedPassword
            });

            //Store the id of the user inside of the users cookie
            req.session.userId = user.id;


            return res.send('User Registered Successfully');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error registering new user');
        }
    });

router.get('/signin', (req, res) => {
    res.send(signinTemplate({ req: req }));
});

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        return res.send('Email not found');
    }

    if (!await User.comparePasswords(user.password, password)) {
        return res.send(`Invalid password!!!`);
    }
    req.session.userId = user.id;
    return res.send('You are signed in!!!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are signed out!!!');
});

module.exports = router;