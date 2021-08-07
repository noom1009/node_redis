const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

app.get('/', (req, res) => {
    res.render('index');
  });
  
const promtpayRouter = require("./promtpay/index");
router.use("/promtpay", promtpayRouter);

const ocrRouter = require("./ocr/index");
router.use("/ocr", ocrRouter);

const noredisRouter = require('./noredis/index');
router.use('/noredis', noredisRouter);

app.get("/noredis", async (req, res) => {

});

module.exports = router;