const Blog = require("../data/db");

const getPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    if (blogPosts) {
      return res.status(200).json({
        status: 200,
        data: blogPosts
      });
    }
    return res.status(404).json({
      status: 404,
      message: "No posts available"
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: "The posts information could not be retrieved."
    });
  }
};
const getById = async (res, id, statusCode) => {
  try {
    const blogPost = await Blog.findById(id);
    if (blogPost.length) {
      return res.status(200).json({
        status: statusCode,
        data: blogPost
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "The post with the specified ID does not exist."
    });
  }
};
const getPostById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  getById(res, id, 200);
};

module.exports = { getPosts, getPostById };
