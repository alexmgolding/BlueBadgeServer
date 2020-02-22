let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let PoultryModel = sequelize.import('../models/poultry')

//Get all recipes
router.get('/getall', function (req, res) {
    let userid = req.user.id
    PoultryModel.findAll()
        .then(
            function findAllSuccess(data) {
                res.json(data)
            },
            function findAllError(err) {
                res.send(500, err.message)
            }
        )
})

//Poultry recipe submission
router.post('/submitrecipe', function (req, res) {
    let ingredients = req.body.meatlog.ingredients
    let recipe = req.body.meatlog.recipe
    let wood = req.body.meatlog.wood
    let temperature = req.body.meatlog.temperature
    let cooktime = req.body.meatlog.cooktime
    let owner = req.user.id

    PoultryModel.create({
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
    PoultryModel.update(
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
    PoultryModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Recipe removed')
            : res.send('Error, nothing removed');
    }),
        err => res.send(500, err.message);
});

module.exports = router