import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  PostDeleteResponse,
  PostFilter,
  PostInput,
  PostListResponse,
  PostPopulatedResponse,
  PostResponse,
  UpdatePostInput,
} from "../schemas/post.schema";
import PostController from "../controllers/post.controller";
import type { Context } from "../types/context";

@Resolver()
class PostResolver {
  constructor(private postController: PostController) {
    this.postController = new PostController();
  }

  @Mutation(() => PostResponse)
  async createPost(@Arg("input") input: PostInput, @Ctx() ctx: Context) {
    return this.postController.createPost(input, ctx);
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @Arg("id") id: string,
    @Arg("input") input: UpdatePostInput,
    @Ctx() ctx: Context
  ) {
    return this.postController.updatePost(id, input, ctx);
  }

  @Mutation(() => PostDeleteResponse)
  async deletePost(@Arg("id") id: string, @Ctx() ctx: Context) {
    return this.postController.deletePost(id, ctx);
  }

  @Query(() => PostPopulatedResponse)
  async getPost(@Arg("id") id: string, @Ctx() ctx: Context) {
    return this.postController.getSinglePost(id, ctx);
  }

  @Query(() => PostListResponse)
  async getPosts(
    @Arg("input", { nullable: true }) input: PostFilter,
    @Ctx() ctx: Context
  ) {
    return this.postController.getPosts(input, ctx);
  }
}

export default PostResolver;
