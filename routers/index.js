const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const promtpayRouter = require("./promtpay/index");
router.use("/promtpay", promtpayRouter);

const ocrRouter = require("./ocr/index");
router.use("/ocr", ocrRouter);

module.exports = router;