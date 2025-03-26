const mongoose = require("mongoose");

const UserMetricsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  bodyFat: { type: Number },
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    arms: { type: Number },
    thighs: { type: Number },
  },
  notes: { type: String },
});

module.exports = mongoose.model("UserMetrics", UserMetricsSchema);
