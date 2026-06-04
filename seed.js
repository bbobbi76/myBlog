const mongoose = require("mongoose");
const Match = require("./models/Match");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleMatches = [
  {
    homeTeam: "Real Madrid",
    awayTeam: "Borussia Dortmund",
    homeScore: 5,
    awayScore: 2,
    matchDate: new Date("2024-10-22"),
    stage: "League Phase - Matchday 3",
    description: "Real Madrid produced a stunning second-half comeback to beat Borussia Dortmund 5-2.",
  },
  {
    homeTeam: "Barcelona",
    awayTeam: "Bayern Munich",
    homeScore: 4,
    awayScore: 1,
    matchDate: new Date("2024-10-23"),
    stage: "League Phase - Matchday 3",
    description: "Raphinha scored a brilliant hat-trick as Barcelona cruised to a 4-1 victory over Bayern Munich.",
  },
  {
    homeTeam: "Manchester City",
    awayTeam: "Sparta Prague",
    homeScore: 5,
    awayScore: 0,
    matchDate: new Date("2024-10-23"),
    stage: "League Phase - Matchday 3",
    description: "Erling Haaland scored a stunning acrobatic goal in Man City's 5-0 win.",
  }
];

const seedDB = async () => {
  await Match.deleteMany({});
  console.log("Old matches deleted.");
  await Match.insertMany(sampleMatches);
  console.log("Sample matches inserted.");
};

seedDB().then(() => {
  mongoose.connection.close();
});
