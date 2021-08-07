const express = require('express');
const redis = require('redis');
const axios = require('axios');
const env = require('./env');
const { text } = require('express');
const QRCode = require('qrcode');
const bp = require("body-parser");
const qr = require("qrcode");
const app = express();
const fs = require('fs');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const redisClient = redis.createClient();
const router = require("./routers/index");

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(router);

var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + '/images');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).single('image');
//route
app.get('/', (req, res) => {
  res.render('index');
});




app.get("/noredis", async (req, res) => {
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
  });

  app.get("/redis", async (req, res) => {
    let date = req.query.date;
    redisClient.get("coviddata", async (error, data) => {
      if (error) {
        return res.status(500).send("Internal server error!");
      } else if (data) {
        data = JSON.parse(data);
        let result = null;
        data.forEach((element) => {
          if (element.Date === date) {
            result = element;
          }
        });
        return result ? res.json(result) : res.status(404).json({ result: "Not found!" });
      } else {
        let fetch = await axios.get(
          env.urlCovid19
        );
        let get = fetch.data.Data;
        // redisClient.set("coviddata", JSON.stringify(get));
        redisClient.setex("coviddata", 10, JSON.stringify(get));
        let result = null;
        get.forEach((element) => {
          if (element.Date === date) {
              result = element;
          }
        });
        return result ? res.json(result) : res.status(404).json({ result: "Not found!" });
      }
    });
  });

  app.get("/redis/clear", async (req, res) => {
    redisClient.del("coviddata");
    res.json({ result: "ok" });
  });

  app.get("/generateqrcode", async (req, res) => {
    const generateQR = async text =>{
        try{
            console.log(await QRCode.toDataURL(text))
        }catch(err){
            console.error(err)
        }
    }
    generateQR(env.urlQrcode);
  });

  app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req.body.url;

  if (url.length === 0) res.send("Empty Data!");
  qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");

      res.render("scan", { src });
  });
});

app.post('/upload', (req, res) => {
  console.log(req.file);
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.send('Something went wrong');
    }

    var image = fs.readFileSync(
      __dirname + '/images/' + req.file.originalname,
      {
        encoding: null
      }
    );
    Tesseract.recognize(image)
      .progress(function(p) {
        console.log('progress', p);
      })
      .then(function(result) {
        res.send(result.html);
      });
  });
});

app.get('/showdata', (req, res) => {});

module.exports = app