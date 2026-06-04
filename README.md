# 🏆 2026 북중미 월드컵 경기 기록실 (2026 World Cup Data Hub)

## 1. 프로젝트 개요 (Project Overview)
본 프로젝트는 **2026 북중미 월드컵(미국, 캐나다, 멕시코)**을 테마로 한 축구 경기 데이터 관리 및 제공 웹 서비스입니다. 
사용자에게는 최신 월드컵 경기 일정과 결과, 주요 하이라이트를 직관적이고 세련된 다이내믹 UI로 제공하며, 관리자에게는 경기 데이터를 쉽게 추가, 수정, 삭제할 수 있는 안전한 대시보드(CRUD 기능)를 제공합니다. 대한민국 축구 국가대표팀의 웅장한 배경과 함께 2026 월드컵 특유의 화려한 테마(네이비, 마젠타, 네온 시안)가 적용되어 있습니다.

---

## 2. 기술 스택 (Tech Stack)

### **Backend (서버 및 비즈니스 로직)**
* **Node.js**: 비동기 I/O 처리 기반의 빠르고 확장성 높은 자바스크립트 런타임
* **Express.js**: 라우팅 및 미들웨어 관리를 돕는 경량화된 웹 프레임워크
* **JSON Web Token (JWT)**: 관리자 인증 및 세션 유지를 위한 보안 토큰

### **Database (데이터베이스)**
* **MongoDB**: 유연한 스키마를 제공하는 NoSQL 데이터베이스
* **Mongoose**: 몽고DB와 Express를 연결해주며, 데이터 스키마(Schema) 검증과 모델링을 돕는 ODM 라이브러리

### **Frontend (사용자 인터페이스)**
* **EJS (Embedded JavaScript Templates)**: 서버 사이드에서 동적으로 HTML을 생성하는 템플릿 엔진
* **Vanilla CSS (Glassmorphism & Dark Mode)**: 최신 웹 디자인 트렌드인 반투명 유리 효과(Glassmorphism)와 어두운 배경(Dark Mode)을 적용한 반응형 스타일링

---

## 3. 폴더 구조 및 시스템 아키텍처 (Architecture)

프로젝트는 MVC(Model-View-Controller) 패턴을 기반으로 관심사를 분리하여 유지보수성을 극대화했습니다.

```text
myBlog/
├── config/
│   └── dbConnect.js       # MongoDB 연결 설정
├── models/
│   ├── Match.js           # 축구 경기 데이터 스키마 모델 (홈팀, 원정팀, 점수 등)
│   └── User.js            # 관리자 계정 스키마 모델
├── routes/
│   ├── main.js            # 일반 사용자용 라우터 (홈, 경기 상세조회)
│   └── admin.js           # 관리자용 라우터 (로그인, CRUD 로직, 인증 미들웨어)
├── views/
│   ├── layouts/           # 공통 HTML 레이아웃 (헤더, 푸터)
│   ├── admin/             # 관리자용 뷰 (대시보드, 추가, 수정 폼)
│   ├── index.ejs          # 메인 홈 화면 (경기 카드 목록)
│   └── match.ejs          # 경기 상세 조회 화면
├── public/
│   └── css/style.css      # 전체 UI 스타일링 (2026 월드컵 테마 적용)
├── seed.js                # 초기 샘플 데이터 자동 생성 스크립트
├── app.js                 # 메인 서버 엔트리 파일
└── .env                   # 환경변수 파일 (DB URI, JWT Secret)
```

---

## 4. 데이터베이스 설계 (Database Schema)

데이터베이스는 철저하게 월드컵 경기 데이터를 기록하는 데 최적화되어 있습니다.

### **Match 컬렉션 (models/Match.js)**
경기 일정과 결과를 담는 메인 데이터베이스 스키마입니다.
* `homeTeam` (String): 홈 팀 국가명 (예: 대한민국)
* `awayTeam` (String): 원정 팀 국가명 (예: 미국)
* `homeScore` (Number): 홈 팀 득점 (경기 전일 경우 Null)
* `awayScore` (Number): 원정 팀 득점 (경기 전일 경우 Null)
* `matchDate` (Date): 경기 일시
* `stage` (String): 경기 단계 (예: 조별리그 - 1차전)
* `description` (String): 경기 상세 내용 및 하이라이트 요약

### **User 컬렉션 (models/User.js)**
보안이 유지되어야 하는 관리자 계정 정보입니다.
* `username` (String): 로그인 아이디
* `password` (String): `bcrypt`를 이용해 암호화(Hashing)된 비밀번호

---

## 5. 주요 기능 상세 (Key Features)

### 1) 동적 데이터 렌더링 및 UI
서버(Express)가 DB(MongoDB)에서 `Match` 데이터를 조회하여, EJS 템플릿에 주입합니다. 사용자는 웹사이트 접속 시 최신 경기 데이터를 화려한 Grid 레이아웃 카드 형태로 확인할 수 있습니다.

### 2) 관리자 인증 시스템 (JWT)
`routes/admin.js`의 `/admin` 주소로 POST 요청을 보내면, DB의 사용자 정보와 비밀번호를 `bcrypt.compare`로 대조합니다. 검증 성공 시 `jsonwebtoken` 패키지를 사용해 고유 토큰을 발급하여 쿠키에 저장합니다. 이후 관리자 페이지 접근 시 `checkLogin` 미들웨어가 쿠키를 검사하여 철저한 인가(Authorization)를 수행합니다.

### 3) 경기 데이터 CRUD 시스템
관리자는 대시보드에서 다음과 같은 기능을 수행할 수 있습니다.
* **Create (생성):** `/add` 폼을 통해 새로운 경기 일정 등록.
* **Read (조회):** `/allMatches` 대시보드에서 전체 경기 목록 관리.
* **Update (수정):** `/edit/:id` 페이지에서 경기 결과(스코어) 및 상세 설명 수정 후 `PUT` 방식으로 서버에 전송.
* **Delete (삭제):** `DELETE` 방식으로 특정 경기 기록을 영구 삭제 (`method-override` 패키지 활용).

---

## 6. 실행 및 설치 가이드 (Installation Guide)

### 1. 환경 설정 (.env)
프로젝트 루트 폴더에 `.env` 파일을 생성하고 환경 변수를 입력합니다.

### 2. 패키지 설치
```bash
npm install
```

### 3. 초기 데이터 세팅 (선택 사항)
```bash
node seed.js
```

### 4. 서버 구동
```bash
node app.js
```
브라우저에서 `http://localhost:3000` 접속.
