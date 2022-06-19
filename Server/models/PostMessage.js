import mongoose from "mongoose";


const postShema = mongoose.Schema({
  title: String,
  message: String,
  author: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});


const PostMessage = mongoose.model('PostMessage', postShema);

export default PostMessage;









