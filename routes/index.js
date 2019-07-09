const express = require("express");
const dbMethod = require("../controllers");
const route = express.Router();

route.get("/", dbMethod.getPosts);

route.get("/:id", dbMethod.getPostById);

route.post("/", dbMethod.createPost);

module.exports = route;
