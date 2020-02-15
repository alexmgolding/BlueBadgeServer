const Sequelize = require('sequelize')
const sequelize = new Sequelize("que", "postgres", "password", {
    host: "localhost",
    dialect: "postgres"
})

sequelize.authenticate().then(
    function () {
        console.log('Connection has been established successfully.')
    },
    function (err) {
        console.log(err)
    }
)

module.exports = sequelize