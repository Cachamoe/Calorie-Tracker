module.exports = function (sequelize, DataTypes) {
    let Exercise = sequelize.define("Exercise", {
        name: DataTypes.STRING,
        calories: DataTypes.INTEGER,
    });
    return Exercise;
};
