const express = require('express');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser')
const {createProxyMiddleware} = require("http-proxy-middleware");
const path = require("path")

const app = express();

app.use("/images", express.static(path.join(__dirname, "/public/images")))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, (err) => {
    if(err) throw err;
    console.log('MongoDb Connected')
});

app.use(`/auth`, require('./routes/userRoute'));
app.use(`/auth`, require('./routes/cartRoute'));
app.use(`/auth`, require('./routes/stripeRoute'));
app.use(`/auth`, require('./routes/orderRoute'))

app.use(`/auth`, createProxyMiddleware({target: "http://localhost:5300", changeOrigin: true}))

app.all(`/*`, (req, res, next) => {
    return res.status(400).json({msg:"Requested Page Not Found"})
    next()
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is up and running at http://localhost:${process.env.PORT}`)
});