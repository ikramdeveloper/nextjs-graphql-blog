import PostModel, { Post } from "../models/post.model";
import { PostInput, PostFilter } from "../schemas/post.schema";
import { Context } from "../types/context";
import errorHandler from "../middleware/errorHandler";

const addPost = async (newPost: Partial<Post>) => {
  const post = await PostModel.create(newPost);
  return post;
};

const getPostById = async (postId: string) => {
  return await PostModel.findById(postId).populate("user").lean();
};

const getPostsByUser = async (userId: string, limit: number, skip: number) => {
  return await PostModel.find({ user: userId })
    .populate("user")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

const getAllPosts = async () => {
  return await PostModel.find().populate("user").lean();
};

const updatePostById = async (postId: string, updatedPost: Partial<Post>) => {
  const post = await PostModel.findByIdAndUpdate(
    postId,
    { ...updatedPost },
    { new: true, runValidators: true, lean: true }
  );
  return post;
};

const deletePostById = async (postId: string) => {
  return await PostModel.findByIdAndDelete(postId);
};

export {
  addPost,
  getPostById,
  updatePostById,
  getAllPosts,
  getPostsByUser,
  deletePostById,
};
