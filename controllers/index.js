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
    if (title && contents) {
      const newPostId = await Blog.insert({ title, contents });
      console.log(newPostId);
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
    const Post = await Blog.findById(PostId);
    if (Post.length !== 0) {
      const comments = await Blog.findPostComments(Post[0].id);
      if (comments.length !== 0) {
        return res.status(200).json({
          status: 200,
          data: comments
        });
      }
      return res.status(200).json({
        status: 200,
        message: "This Post has no comments"
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "The comments information could not be retrieved."
    });
  }
};

const postComments = async (req, res) => {
  try {
    const { text } = req.body;
    const PostId = req.params.id;
    const Post = await Blog.findById(PostId);
    if (Post.length) {
      if (text) {
        const newComments = await Blog.insertComment({ text, post_id: PostId });
        return res.status(200).json({
          status: 200,
          data: newComments
        });
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide text for the comment."
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "There was an error while saving the comment to the database"
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const PostId = req.params.id;
    const Post = await Blog.findById(PostId);
    if (Post.length) {
      if (title && contents) {
        const postUpdate = await Blog.update(PostId, { title, contents });
        return getById(res, PostId, 200);
      }
      return res.status(400).json({
        status: 400,
        errorMessage: "Please provide title and contents for the post."
      });
    }
    return res.status(404).json({
      status: 404,
      message: "The post with the specified ID does not exist."
    });
  } catch (err) {
    return res.status(400).json({
      status: 500,
      error: "There was an error while saving the comment to the database"
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  getComments,
  postComments,
  updatePost
};
