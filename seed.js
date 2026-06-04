const mongoose = require("mongoose");
const Match = require("./models/Match");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleMatches = [
  {
    homeTeam: "레알 마드리드",
    awayTeam: "보루시아 도르트문트",
    homeScore: 5,
    awayScore: 2,
    matchDate: new Date("2024-10-22"),
    stage: "리그 페이즈 - 3차전",
    description: "레알 마드리드가 후반전 놀라운 역전극을 펼치며 보루시아 도르트문트를 5-2로 물리쳤습니다.",
  },
  {
    homeTeam: "바르셀로나",
    awayTeam: "바이에른 뮌헨",
    homeScore: 4,
    awayScore: 1,
    matchDate: new Date("2024-10-23"),
    stage: "리그 페이즈 - 3차전",
    description: "하피냐의 눈부신 해트트릭에 힘입어 바르셀로나가 바이에른 뮌헨을 4-1로 완파했습니다.",
  },
  {
    homeTeam: "맨체스터 시티",
    awayTeam: "스파르타 프라하",
    homeScore: 5,
    awayScore: 0,
    matchDate: new Date("2024-10-23"),
    stage: "리그 페이즈 - 3차전",
    description: "엘링 홀란드가 환상적인 아크로바틱 골을 터뜨리며 맨시티의 5-0 대승을 이끌었습니다.",
  }
];

const seedDB = async () => {
  await Match.deleteMany({});
  console.log("이전 경기 데이터가 모두 삭제되었습니다.");
  await Match.insertMany(sampleMatches);
  console.log("샘플 경기 데이터가 성공적으로 추가되었습니다.");
};

seedDB().then(() => {
  mongoose.connection.close();
});
