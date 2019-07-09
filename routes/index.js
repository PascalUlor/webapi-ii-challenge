const express = require("express");
const dbMethod = require("../controllers");
const route = express.Router();

route.get("/", dbMethod.getPosts);

module.exports = route;
