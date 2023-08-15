const express = require("express");

const router = express.Router();

const Post = require("../models/post");

const verifyToken = require("../middleware/auth");

// @route POST /api/posts
// @desc Create Post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, desciption, status, url } = req.body;

  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      desciption,
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
      user: req.userId,
    });

    //save post to database
    const post = await Post.create(newPost);
    res.json({ success: true, message: "Happy Learning", post });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error add" });
  }
});

// @route GET /api/posts
// @desc GET Post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route UPDATE /api/posts
// @desc UPDATE Post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, desciption, status, url } = req.body;
  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  const { id } = req.params;
  try {
    let updatedPost = {
      title,
      desciption: desciption || "",
      status: status || "TO LEARN",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
    };

    // const postUpdateCondition = { _id: req.params.id, user: req.userId };

    const updated = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    //user not authorised to update post or post not found
    if (!updated)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent Progress!!!",
      post: updated,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error update" });
  }
});

// @route DELETE /api/posts
// @desc DELETE Post
// @access Private
router.delete("/:pid", verifyToken, async (req, res) => {
  try {
    // const postDeleteCondition = {
    //   // _id: req.params.id.toString(),
    //   user: req.userId,
    // };
    const { pid } = req.params;
    console.log(pid);
    const deletedPost = await Post.findByIdAndDelete(pid.toString());
    console.log("eee: ", deletedPost);
    //user not authorised to update post or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, post: deletedPost });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error delete" });
  }
});

module.exports = router;
