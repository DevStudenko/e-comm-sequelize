const express = require('express');
const { check, validationResult } = require('express-validator');

const { User } = require('../../db/models');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
// const signup = require('../../views/admin/auth/signup');

const router = express.Router();

router.get('/signup', (req, res, next) => {
    return res.send(signupTemplate({ req: req }));
});

router.post('/signup', [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const existingUser = await User.findOne({
                where: {
                    email
                }
            });
            if (existingUser) {
                throw new Error('Email in use')
            }
        }),
    check('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters'),
    check('passwordConfirmation')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            }
        })
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