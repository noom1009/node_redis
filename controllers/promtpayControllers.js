const express = require("express");
const router = express.Router();
const axios = require("axios");
const cors = require("cors");
const app = express();
const log4js = require("log4js");
const log = log4js.getLogger();
const logger = require("morgan");
const session = require("express-session");
const configPages = require('../configs/configPages')
const env = require('../configs/env');
const qrcode = require('qrcode');
const generatePayload = require('promptpay-qr');
const amount = env.amountPromtpay;
const payload = generatePayload( env.mobileNumberPromtpay ,{amount});

exports.getPageController =  (req, res, next) => {
    qrcode.toFile('./imageQR/result.png',payload,function(err){
        if (err) throw err
        console.log('Complete');
    });
  res.render(configPages.homePage, {
    title: "Plot TradingView Charts",
    header: "Test call api ETHUSDT",
    messages: "https://api.binance.com",
  });
};

exports.promtpayControllers = (req, res, next) => {};