let date = req.query.date;
let fetch = await axios.get(env.urlCovid19);
let data = fetch.data.Data;
let result = null;
data.forEach((element) => {
  if (element.Date === date) {
    result = element;
  }
});
result ? res.json(result) : res.status(404).json({ result: "Not found" });

const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const path = require("path");
const session = require("express-session");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const crypto = require("crypto");
const promtpayControllers = require("../../controllers/promtpayControllers");

router.get(
  "/",
  promtpayControllers.getPageController,
  function (req, res, next) {}
);

router.post(
  "/",
  promtpayControllers.getPageController,
  function (req, res, next) {}
);

module.exports = router;
