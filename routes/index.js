const express = require("express");
const dbMethod = require("../controllers");
const route = express.Router();

route.get("/", dbMethod.getPosts);

route.get("/:id", dbMethod.getPostById);

module.exports = route;
