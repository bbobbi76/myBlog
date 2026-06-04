const mongoose = require("mongoose");
const Match = require("./models/Match");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleMatches = [
  {
    homeTeam: "대한민국",
    awayTeam: "미국",
    homeScore: 2,
    awayScore: 1,
    matchDate: new Date("2026-06-12"),
    stage: "조별리그 - 1차전",
    description: "2026 북중미 월드컵 대한민국의 첫 경기! 짜릿한 역전승으로 첫 단추를 완벽하게 꿰었습니다.",
  },
  {
    homeTeam: "아르헨티나",
    awayTeam: "멕시코",
    homeScore: 3,
    awayScore: 0,
    matchDate: new Date("2026-06-15"),
    stage: "조별리그 - 2차전",
    description: "디펜딩 챔피언 아르헨티나가 개최국 멕시코를 상대로 압도적인 경기력을 보여주며 3-0 대승을 거뒀습니다.",
  },
  {
    homeTeam: "프랑스",
    awayTeam: "캐나다",
    homeScore: 4,
    awayScore: 2,
    matchDate: new Date("2026-06-18"),
    stage: "조별리그 - 3차전",
    description: "음바페의 멀티골에 힘입어 프랑스가 캐나다를 꺾고 조 1위로 32강에 진출했습니다.",
  }
];

const seedDB = async () => {
  await Match.deleteMany({});
  console.log("이전 경기 데이터가 모두 삭제되었습니다.");
  await Match.insertMany(sampleMatches);
  console.log("2026 북중미 월드컵 샘플 경기 데이터가 성공적으로 추가되었습니다.");
};

seedDB().then(() => {
  mongoose.connection.close();
});
