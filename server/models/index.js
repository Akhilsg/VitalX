const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./User");
db.workout = require("./Workout");
db.progress = require("./UserProgress");
db.metrics = require("./UserMetrics");
db.nutrition = require("./Nutrition");

module.exports = db;
