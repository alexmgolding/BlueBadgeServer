let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let User = sequelize.import('../models/user')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

//Creating First Time User
router.post('/createuser', function (req, res) {
    let userName = req.body.user.username;
    let password = req.body.user.password;

    User.create({
        username: userName,
        passwordhash: bcrypt.hashSync(password, 10)
    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })
            res.json({
                user: user,
                message: 'create',
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
})

//Signing in existing User
router.post('/signin', function (req, res) {
    let email = req.body.user.username
    let password = req.body.user.password

    User.findOne({
        where: { username: email }
    }).then(user => {
        user ? comparePasswords(user) : res.send('User not found in database')
        function comparePasswords(user) {
            bcrypt.compare(password, user.passwordhash, function (err, matches) {
                matches ? generateToken(user) : res.json({ error: 'Incorrect Password' })
            })
        }
        function generateToken(user) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            })
            res.json({
                user: user,
                message: 'create',
                sessionToken: token
            })
        }
    })
})

module.exports = router