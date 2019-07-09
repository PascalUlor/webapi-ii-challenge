const express = require("express");
const router = require("./routes");
const server = express();

const port = 8000 || process.env;

server.use(express.json());
server.use("/api/posts", router);

/**
 * All wrong routes
 */
server.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Wrong route"
  });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
