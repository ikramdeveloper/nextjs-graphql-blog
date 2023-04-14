import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-micro";
import { setCookie } from "cookies-next";
import errorHandler from "../middleware/errorHandler";
import {
  LoginInput,
  SignUpInput,
  UpdateInput,
  ResetPasswordInput,
} from "../schemas/user.schema";
import UserModel, { User } from "../models/user.model";
import { Context } from "../types/context";
import { verifyJwt } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookie.util";
import {
  createUser,
  findByEmail,
  findById,
  signTokens,
  updateUserById,
  signOneToken,
} from "../services/user.service";
// import { getValue, removeValue } from "../services/redis.service";
import {
  getToken,
  deleteOneToken,
  deleteManyTokens,
} from "../services/token.service";

class UserController {
  registerUser = async (input: SignUpInput) => {
    try {
      const user = await createUser(input);

      return {
        success: true,
        user,
      };
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ForbiddenError("Email already taken");
      }
      errorHandler(err);
    }
  };

  loginUser = async (input: LoginInput, { req, res }: Context) => {
    try {
      const message = "Invalid email or password";

      // #1: Find User & compare passwords
      const foundUser = await findByEmail(input.email);
      if (
        !foundUser ||
        !(await UserModel.comparePasswords(input.password, foundUser.password))
      ) {
        return new AuthenticationError(message);
      }

      // #2: Sign JWT tokens
      const { accessToken, refreshToken } = signTokens(foundUser);

      // #3: Set cookies
      setCookie("access_token", accessToken, {
        req,
        res,
        ...accessTokenCookieOptions,
      });
      setCookie("refresh_token", refreshToken, {
        req,
        res,
        ...refreshTokenCookieOptions,
      });
      setCookie("logged_in", " true", {
        req,
        res,
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return {
        success: true,
        accessToken,
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  getProfile = async ({ req, res, auth }: Context) => {
    try {
      const user = await auth(req, res);
      return {
        success: true,
        user,
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  refreshAccessToken = async ({ req, res }: Context) => {
    try {
      const message = "Could not refresh access token";
      const { refresh_token } = req.cookies;
      if (!refresh_token) {
        throw new AuthenticationError(message);
      }

      // Validate refresh token
      const decoded = verifyJwt<{ userId: string; uid: string }>(
        refresh_token,
        "refreshTokenPublicKey"
      );
      if (!decoded) {
        throw new AuthenticationError(message);
      }

      // Validate session
      // const session = await getValue(decoded.uid);
      const session = await getToken({ uid: decoded.uid });
      if (!session) {
        throw new AuthenticationError("session has expired");
      }

      // check if user exists
      const user = await findById(decoded.userId);
      if (!user || !user.isVerified) {
        throw new AuthenticationError(message);
      }

      // Sign new access token
      const accessToken = signOneToken(
        { userId: user._id.toString(), uid: decoded.uid },
        "accessTokenPrivateKey"
      );

      // #: Set cookies
      setCookie("access_token", accessToken, {
        req,
        res,
        ...accessTokenCookieOptions,
      });
      setCookie("logged_in", " true", {
        req,
        res,
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return {
        success: true,
        accessToken,
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  logoutUser = async ({ req, res, auth }: Context) => {
    try {
      const user = await auth(req, res);
      const message = "Invalid refresh token";
      const { refresh_token } = req.cookies;
      if (!refresh_token) {
        throw new AuthenticationError(message);
      }
      const decoded = verifyJwt<{ userId: string; uid: string }>(
        refresh_token,
        "refreshTokenPublicKey"
      );
      if (!decoded) {
        throw new AuthenticationError(message);
      }

      // Delete user's session
      await deleteOneToken({ uid: decoded.uid });

      // Logout user
      setCookie("access_token", "", { req, res, maxAge: -1 });
      setCookie("refresh_token", "", { req, res, maxAge: -1 });
      setCookie("logged_in", "", { req, res, maxAge: -1 });

      return {
        success: true,
        message: "User logged out successfully",
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  updateUser = async (input: UpdateInput, { req, res, auth }: Context) => {
    try {
      const user = await auth(req, res);
      if (!user) return;
      await updateUserById(user._id, input);

      return {
        success: true,
        message: "User updated successfully",
      };
    } catch (err) {
      errorHandler(err);
    }
  };

  resetPassword = async (
    input: ResetPasswordInput,
    { req, res, auth }: Context
  ) => {
    try {
      const user = await auth(req, res);

      // #1: Find user and compare old password
      if (
        !user ||
        !(await UserModel.comparePasswords(input.oldPassword, user.password))
      ) {
        return new UserInputError("Invalid old password");
      }

      // #2: Update user password
      const result = await updateUserById(user._id, {
        password: input.newPassword,
      });
      if (!result) {
        return new UserInputError("User not found");
      }

      // #3: Delete all tokens of the user
      await deleteManyTokens({ userId: user._id });

      // #4: Sign new JWT tokens
      const { accessToken, refreshToken } = signTokens(user);

      // #5: Set cookies
      setCookie("access_token", accessToken, {
        req,
        res,
        ...accessTokenCookieOptions,
      });
      setCookie("refresh_token", refreshToken, {
        req,
        res,
        ...refreshTokenCookieOptions,
      });
      setCookie("logged_in", " true", {
        req,
        res,
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      return {
        success: true,
        message: "Password reset successfully",
        accessToken,
      };
    } catch (err) {
      errorHandler(err);
    }
  };
}

export default UserController;
