import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
    },
    summary: {
      type: String,
      required: [true, "please provide summary"],
      max: 300,
    },
    content: {
      type: String,
      required: [true, "please provide content"],
    },
    cover: {
      type: String,
      required: [true, "please provide a cover image"],
    },
    auther: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

export default Post;
