const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  homeScore: {
    type: Number,
    default: null, // null if match hasn't been played
  },
  awayScore: {
    type: Number,
    default: null,
  },
  matchDate: {
    type: Date,
    required: true,
  },
  stage: {
    type: String, // e.g., "League Phase - Matchday 1"
    required: true,
  },
  description: {
    type: String, // additional details or match summary
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Match", MatchSchema);
