const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true }
);
const CommentModel = model("Comment", CommentSchema);
module.exports = CommentModel;
