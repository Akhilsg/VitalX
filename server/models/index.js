const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./User");
db.workout = require("./Workout");
db.nutrition = require("./Nutrition");
db.progress = require("./UserProgress");
db.metrics = require("./UserMetrics");

module.exports = db;
