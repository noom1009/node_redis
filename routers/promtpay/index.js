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