import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { hasCookie, getCookie } from "cookies-next";
import errorHandler from "./errorHandler";
import UserModel from "../models/user.model";
import { verifyJwt } from "../utils/jwt";
// import { getValue } from "../services/redis.service";
import { getToken } from "../services/token.service";

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // #1: Get Access Token
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (hasCookie("access_token", { req, res })) {
      accessToken = getCookie("access_token", { req, res });
    }

    if (!accessToken) throw new AuthenticationError("Unauthenticated");

    // #2: Validate Access Token
    const decoded = verifyJwt<{ userId: string; uid: string }>(
      String(accessToken),
      "accessTokenPublicKey"
    );
    if (!decoded) throw new AuthenticationError("Invalid token");

    // #3: Check if session is valid
    const session = await getToken({ uid: decoded.uid });
    if (!session) throw new AuthenticationError("Invalid session");

    // console.log("session", session);

    // #4: Check if user exists
    const user = await UserModel.findById(decoded.userId)
      .select("+isVerified")
      .select("+password")
      .lean(true);

    if (!user || !user.isVerified) {
      throw new AuthenticationError("User no longer exists");
    }

    if (hasCookie("refresh_token", { req, res })) {
      const refreshToken = getCookie("refresh_token", { req, res });
      // console.log("refresh token", refreshToken);
      if (session.token !== refreshToken) {
        console.log("invalid user");
      }
    }

    return user;
  } catch (err) {
    errorHandler(err);
  }
};

export default auth;
