import {
  ForbiddenError,
  ValidationError,
  UserInputError,
} from "apollo-server-micro";
import { PostFilter, PostInput } from "../schemas/post.schema";
import errorHandler from "../middleware/errorHandler";
import {
  addPost,
  getPostById,
  updatePostById,
  getPostsByUser,
  deletePostById,
} from "../services/post.service";
import { Context } from "../types/context";
import auth from "../middleware/auth";

class PostController {
  createPost = async (input: Partial<PostInput>, { req, res }: Context) => {
    console.log("create post", input);
    try {
      const user = await auth(req, res);
      const post = await addPost({ ...input, user: user?._id });
      return {
        success: true,
        post,
      };
    } catch (err: any) {
      if (err.code === 11000) {
        throw new UserInputError("Post with that title already exist");
      }
      errorHandler(err);
    }
  };

  getPosts = async (input: PostFilter, { req, res }: Context) => {
    try {
      const user = await auth(req, res);
      if (!user?._id) return;

      //    Pagination
      const page = input.page || 1;
      const limit = input.limit || 10;
      const skip = (page - 1) * limit;
      const posts = await getPostsByUser(user?._id, limit, skip);

      return {
        success: true,
        results: posts.length,
        posts,
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  getSinglePost = async (id: string, { req, res }: Context) => {
    try {
      await auth(req, res);
      const foundPost = await getPostById(id);
      if (!foundPost) throw new UserInputError("Post not found");

      return {
        success: true,
        post: foundPost,
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  updatePost = async (
    id: string,
    input: Partial<PostInput>,
    { req, res }: Context
  ) => {
    try {
      await auth(req, res);
      const post = await updatePostById(id, input);
      if (!post) throw new UserInputError("Post not found");

      return { success: true, post };
    } catch (err) {
      errorHandler(err);
    }
  };

  deletePost = async (id: string, { req, res }: Context) => {
    try {
      await auth(req, res);
      const post = await deletePostById(id);
      if (!post) throw new UserInputError("Post not found");

      return {
        success: true,
        message: "Post deleted successfully",
      };
    } catch (err) {
      errorHandler(err);
    }
  };
}

export default PostController;
