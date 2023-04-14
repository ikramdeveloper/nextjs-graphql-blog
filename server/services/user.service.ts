import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { setCookies } from "cookies-next";
import errorHandler from "../middleware/errorHandler";
import auth from "../middleware/auth";
import { LoginInput } from "../schemas/user.schema";
import UserModel, { User } from "../models/user.model";
import { signJwt, verifyJwt } from "../utils/jwt";
import {
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
} from "../utils/cookie.util";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { PrivateKeyType } from "../types/type";
// import { setValue } from "./redis.service";
import { setToken } from "./token.service";

const findByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({ email }).select("+password");
};

const findById = async (userId: string): Promise<User | null> => {
  return UserModel.findById(userId).select("+isVerified");
};

const signOneToken = (
  payload: { userId: string; uid?: string },
  keyName: PrivateKeyType
) => {
  let expiryTime;
  if (keyName === "accessTokenPrivateKey") {
    expiryTime = accessTokenExpiresIn;
  } else if (keyName === "refreshTokenPrivateKey") {
    expiryTime = refreshTokenExpiresIn;
  }

  const token = signJwt(payload, keyName, { expiresIn: `${expiryTime}m` });

  return token;
};

const signTokens = (user: User) => {
  const userId: string = user?._id?.toString();
  const uniqueId = uuid();
  const accessToken = signJwt(
    { userId, uid: uniqueId },
    "accessTokenPrivateKey",
    {
      expiresIn: `${accessTokenExpiresIn}m`,
    }
  );

  const refreshToken = signJwt(
    { userId, uid: uniqueId },
    "refreshTokenPrivateKey",
    {
      expiresIn: `${refreshTokenExpiresIn}m`,
    }
  );

  setToken({ uid: uniqueId, userId, token: refreshToken });
  // setValue(
  //   uniqueId,
  //   JSON.stringify({ _id: userId, refreshToken: refreshToken }),
  //   {
  //     EX: refreshTokenExpiresIn * 60,
  //   }
  // );

  return { accessToken, refreshToken };
};

const createUser = async (user: Partial<User>) => {
  return UserModel.create(user);
};

const updateUserById = async (id: string, user: Partial<User>) => {
  let hashedPassword;
  if (user.password) hashedPassword = await hash(user.password, 12);
  return await UserModel.findByIdAndUpdate(
    id,
    { ...user, ...(user.password && { password: hashedPassword }) },
    {
      new: true,
      lean: true,
      runValidators: true,
    }
  );
};

export {
  findByEmail,
  findById,
  createUser,
  signTokens,
  updateUserById,
  signOneToken,
};
