const express = require("express");
const dbMethod = require("../controllers");
const route = express.Router();

route.get("/", dbMethod.getPosts);

route.get("/:id", dbMethod.getPostById);

route.get("/:id/comments", dbMethod.getComments);

route.post("/", dbMethod.createPost);

route.post("/:id/comments", dbMethod.postComments);

module.exports = route;
