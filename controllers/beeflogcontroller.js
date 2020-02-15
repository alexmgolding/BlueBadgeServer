let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let BeefModel = sequelize.import('../models/beef')

//Find by User ID
router.get('/getall', function (req, res) {
    BeefModel.findAll()
        .then(
            function findAllSuccess(data) {
                res.json(data)
            },
            function findAllError(err) {
                res.send(500, err.message)
            }
        )
})

//Find by Table ID
router.get('/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    BeefModel.findOne({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        data ? res.json(data) : res.send('Not Authorized to view item');
    }),
        err => res.send(500, err.message);
});

//Beef recipe submission
router.post('/submitrecipe', function (req, res) {
    let ingredients = req.body.meatlog.ingredients
    let recipe = req.body.meatlog.recipe
    let wood = req.body.meatlog.wood
    let temperature = req.body.meatlog.temperature
    let cooktime = req.body.meatlog.cooktime
    let owner = req.user.id

    BeefModel.create({
        ingredients: ingredients,
        recipe: recipe,
        wood: wood,
        temperature: temperature,
        cooktime: cooktime,
        owner: owner
    }).then(
        function createSuccess(response) {
            res.json({ message: 'success', added: response });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

//Recipe update
router.put('/update/:id', function (req, res) {
    let userid = req.user.id
    let primaryKey = req.params.id
    let ingredients = req.body.meatlog.ingredients
    let recipe = req.body.meatlog.recipe
    let wood = req.body.meatlog.wood
    let temperature = req.body.meatlog.temperature
    let cooktime = req.body.meatlog.cooktime
    BeefModel.update(
        {
            ingredients: ingredients,
            recipe: recipe,
            wood: wood,
            temperature: temperature,
            cooktime: cooktime
        },
        { where: { id: primaryKey, owner: userid } }
    ).then(data => {
        return data > 0
            ? res.send('Update Successful!')
            : res.send('Error, no updates where made.');
    }),
        err => res.send(500, err.message);
})

//Delete recipe
router.delete('/delete/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    BeefModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Recipe removed')
            : res.send('Error, nothing removed');
    }),
        err => res.send(500, err.message);
});

module.exports = router