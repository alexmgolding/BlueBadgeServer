module.exports = function (sequelize, DataTypes) {
    return sequelize.define('vegetablelog', {
        ingredients: DataTypes.STRING(2000),
        recipe: DataTypes.STRING(10000),
        wood: DataTypes.STRING,
        temperature: DataTypes.STRING,
        cooktime: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}