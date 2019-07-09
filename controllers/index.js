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
  return getById(res, id, 200);
};

const createPost = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const newPostId = await Blog.insert({ title, contents });
    console.log(newPostId);
    if (newPostId & !title & !contents) {
      return getById(res, newPostId.id, 201);
    }
    return res.status(400).json({
      status: 400,
      errorMessage: "Please provide title and contents for the post."
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "There was an error while saving the post to the database"
    });
  }
};

const getComments = async (req, res) => {
  try {
    const PostId = req.params.id;
    const comments = await Blog.findPostComments(PostId);
    if (comments) {
      res.status(200).json({
        status: 200,
        data: comments
      });
    }
    res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "The comments information could not be retrieved."
    });
  }
};

module.exports = { getPosts, getPostById, createPost, getComments };
