const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Match = require("../models/Match");
const asynchandler = require("express-async-handler");

router.get(
  ["/", "/home"],
  asynchandler(async (req, res) => {
    const locals = {
      title: "Champions League Matches",
    };

    const data = await Match.find({}).sort({ matchDate: 1 });
    res.render("index", { locals, data, layout: mainLayout });
  })
);

/**
 * GET match/:id
 * Match details
 */
router.get(
  "/match/:id",
  asynchandler(async (req, res) => {
    const data = await Match.findOne({ _id: req.params.id });
    res.render("match", { data, layout: mainLayout });
  })
);

router.get("/about", (req, res) => {
  res.render("about", { layout: mainLayout });
});

router.get("/contact", (req, res) => {
  res.render("contact", { layout: mainLayout });
});

module.exports = router;
