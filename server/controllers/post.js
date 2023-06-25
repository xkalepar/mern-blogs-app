import fs, { close } from "fs";
import Post from "../models/Post.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("auther", ["username"])
      .sort("createdAt");
    if (!posts) {
      return res.status(404).json({ msg: "not items" });
    }
    // console.log(posts)
    res.status(200).json({ posts: posts, nHits: posts.length });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("auther", ["username"]);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      body: { title, summary, content },
      user: { _id: id, username: createdBy },
    } = req;
    if (!id) {
      return res.status(401).json({ msg: "No User" });
    }
    if (!title || !summary || !content) {
      return res.status(400).json({ msg: "must to provide all the value " });
    }
    const { originalname, path } = req.file;
    const cover = await fileRenaming(originalname, path);
    const newPost = await Post.create({
      title,
      summary,
      content,
      cover,
      auther: id,
    });

    if (!newPost) {
      return res.status(401).json({ msg: `cann't create post` });
    }
    res.status(201).json({ newPost });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};
const updatePost = async (req, res) => {
  try {
    const {
      body: { title, summary, content },
      user: { _id: id },
      params: { id: postID },
    } = req;

    if (!id) {
      return res.status(401).json({ msg: "Auth Error" });
    }
    if (!title || !summary || !content) {
      return res.status(400).json({ msg: "must to provide all the value " });
    }
    //  update list
    const updatedListItems = {
      title: title,
      summary: summary,
      content: content,
      auther: id,
      cover: ''
    };

    if (req.file) {
      const { originalname, path } = req.file;
      const cover = await fileRenaming(originalname, path);
      updatedListItems.cover = cover;
    }

    const specificPost = await Post.findOne({
      _id: postID,
    });

    updatedListItems.cover = specificPost.cover;
    console.log(updatedListItems)
    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postID,
      },
      updatedListItems,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPost) {
      return res.status(401).json({ msg: `cann't edit post` });
    }
    res.status(201).json({ updatedPost });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};
const deletePost = async(req, res) => {
    try {
        const {
            user: { _id: id },
            params: { id: postID },
          } = req;
          const specificPost = await Post.findOne({
            _id: postID,
          });
        const delet = await Post.findOneAndDelete({
            _id: postID,
            auther: id
        })
        res.status(200).json({msg: 'ok'})
    } catch (error) {
        
    }
}

async function fileRenaming(originalname, path) {
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  try {
    await fs.promises.rename(path, newPath);
    return newPath;
  } catch (error) {
    throw error;
  }
}
export { getPosts, getPost, createPost, updatePost, deletePost };
