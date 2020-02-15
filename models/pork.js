module.exports = function (sequelize, DataTypes) {
    return sequelize.define('porklog', {
        ingredients: DataTypes.STRING,
        recipe: DataTypes.STRING(10000),
        wood: DataTypes.STRING,
        temperature: DataTypes.STRING,
        cooktime: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}