
import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js'



// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const post_messages = await PostMessage.find();
    return res.status(200).json(post_messages)
  } 
  catch (error) {
    return res.status(400).json({"message": error.message})
  }
}







// CREATE POST

export const createPost = async (req, res) => {

  const post = req.body;

  const new_post = new PostMessage({
    ...post, 
    author: req.userId, 
    createdAt: new Date().toISOString()
  })
  
  try {
    await new_post.save();
    return res.status(201).json(new_post)
  } 
  catch (error) {
    return res.status(409).json({'message': error.message})
  }
}








// UPDATE POST
export const updatePost = async (req, res) => {
  const {id: _id} = req.params
  const post = req.body;

  // Check if its a valid id
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post doesn't exist")
  }

  try {
    const updated_post = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true});
    return res.status(201).json(updated_post)
  } 
  catch (error) {
    return res.status(409).json({'message': error.message})
  }
} 










// DELETE POST
export const deletePost = async (req, res) => {
  const {id: _id} = req.params

  // Check if its a valid id
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post doesn't exist")
  }
  
  try {
    const deleted_post = await PostMessage.findByIdAndRemove(_id);
    return res.status(201).json(deleted_post)
  } 
  catch (error) {
    return res.status(409).json({'message': error.message})
  }
} 








// LIKE POST
export const likePost = async (req, res) => {
  const { id } = req.params;

  // Check if user is authenticated
  if(!req.userId) {
    res.json({'message': 'Not authenticated'})
  }
  
  // Check if its a valid post id
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Post doesn't exist")
  }
  
  try {

    const post = await PostMessage.findById(id); // Find the post 

    const index = post.likes.findIndex((id) => id === String(req.userId))

    // Check if he has liked already;
    if(index == -1) {
      post.likes.push(req.userId) // like the post
    }
    else{
      post.likes = post.likes.filter(id => id !== String(req.userId)) // dislike the post
    }

    const updated_post = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(201).json(updated_post);
  } 
  catch (error) {
    console.log(error)
  } 
}

