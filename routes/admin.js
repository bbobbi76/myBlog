const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Match = require("../models/Match");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * Check Login
 */
const checkLogin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin");
  } else {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.redirect("/admin");
    }
  }
};

/**
 * GET /admin
 * Admin page
 */
router.get(
  "/admin",
  asyncHandler(async (req, res) => {
    const locals = {
      title: "관리자 페이지",
    };

    res.render("admin/index", { locals, layout: adminLayout2 });
  })
);

/**
 * POST /admin
 * Check admin login
 */
router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/allMatches");
  })
);

/**
 * GET /allMatches
 * Get all matches
 */
router.get(
  "/allMatches",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "Champions League Matches",
    };
    const data = await Match.find().sort({ matchDate: 1 });
    res.render("admin/allPosts", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);

/**
 * GET /logout
 * Admin logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

/**
 * GET /add
 * Admin - Add Match
 */
router.get(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "경기 기록 추가",
    };
    res.render("admin/add", {
      locals,
      layout: adminLayout,
    });
  })
);

/**
 * POST /add
 * Admin - Add Match
 */
router.post(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { homeTeam, awayTeam, homeScore, awayScore, matchDate, stage, description } = req.body;

    const newMatch = new Match({
      homeTeam,
      awayTeam,
      homeScore: homeScore ? Number(homeScore) : null,
      awayScore: awayScore ? Number(awayScore) : null,
      matchDate,
      stage,
      description,
    });

    await Match.create(newMatch);

    res.redirect("/allMatches");
  })
);

/**
 * GET /edit/:id
 * Admin - Edit Match
 */
router.get(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "경기 기록 편집",
    };
    const data = await Match.findOne({ _id: req.params.id });
    res.render("admin/edit", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);

/**
 * PUT /edit/:id
 * Admin - Edit Match
 */
router.put(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { homeTeam, awayTeam, homeScore, awayScore, matchDate, stage, description } = req.body;
    await Match.findByIdAndUpdate(req.params.id, {
      homeTeam,
      awayTeam,
      homeScore: homeScore ? Number(homeScore) : null,
      awayScore: awayScore ? Number(awayScore) : null,
      matchDate,
      stage,
      description,
      createdAt: Date.now(),
    });
    res.redirect("/allMatches");
  })
);

/**
 * DELETE /delete/:id
 * Admin - Delete Match
 */
router.delete(
  "/delete/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Match.deleteOne({ _id: req.params.id });
    res.redirect("/allMatches");
  })
);

module.exports = router;
