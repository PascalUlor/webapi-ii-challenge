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

module.exports = { getPosts };
