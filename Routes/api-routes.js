// Require models
const db = require("../models");
const moment = require('moment');
const { Op } = require("sequelize");

// Routes
module.exports = function (app) {

    // GET route to get all foods
    app.get("/api/foods/current", function (req, res) {
        let today = moment().format('YYYY-MM-DD');
        let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
        db.Food.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(today), new Date(tomorrow)]
                }
            }
        }).then(function (dbFood) {
            res.json(dbFood);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // POST route for creating new food
    app.post("/api/foods", function (req, res) {
        db.Food.create({
            name: req.body.name,
            calories: req.body.calories,
            time: req.body.time
        }).then(function (dbFood) {
            res.json(dbFood);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // GET route to get all exercises
    app.post("/api/exercise/current", function (req, res) {
        let today = moment().format('YYYY-MM-DD');
        let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
        db.Exercise.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(today), new Date(tomorrow)]
                }
            }
        }).then(function (dbExercise) {
            res.json(dbExercise);
        }).catch(function (err) {
            res.json(err);
        });
    });

    // POST route for creating new exercise
    app.post("/api/exercise", function (req, res) {
        db.Exercise.create({
            name: req.body.name,
            calories: req.body.calories
        }).then(function (dbExercise) {
            res.json(dbExercise);
        }).catch(function (err) {
            res.json(err);
        });
    });
}