const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');


const app = express();

app.use(cors({ origin: true }))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
