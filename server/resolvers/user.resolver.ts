import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  LoginInput,
  LoginResponse,
  SignUpInput,
  UserResponse,
  ApiResponse,
  UpdateInput,
  ResetPasswordInput,
  ResetPasswordResponse,
} from "../schemas/user.schema";
import UserController from "../controllers/user.controller";
import type { Context } from "../types/context";

@Resolver()
class UserResolver {
  constructor(private userController: UserController) {
    this.userController = new UserController();
  }

  @Mutation(() => UserResponse)
  async registerUser(@Arg("input") input: SignUpInput) {
    return this.userController.registerUser(input);
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
    return this.userController.loginUser(input, ctx);
  }

  @Query(() => UserResponse)
  async getProfile(@Ctx() ctx: Context) {
    return this.userController.getProfile(ctx);
  }

  @Query(() => LoginResponse)
  async refreshToken(@Ctx() ctx: Context) {
    return this.userController.refreshAccessToken(ctx);
  }

  @Query(() => ApiResponse)
  async logoutUser(@Ctx() ctx: Context) {
    return this.userController.logoutUser(ctx);
  }

  @Mutation(() => ApiResponse)
  async updateUser(
    @Arg("input", { nullable: true }) input: UpdateInput,
    @Ctx() ctx: Context
  ) {
    return this.userController.updateUser(input, ctx);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Arg("input") input: ResetPasswordInput,
    @Ctx() ctx: Context
  ) {
    return this.userController.resetPassword(input, ctx);
  }
}

export default UserResolver;
