import jwt, { SignOptions } from "jsonwebtoken";
import { PrivateKeyType, PublicKeyType } from "@/server/types/type";

const signJwt = (
  payload: object,
  keyName: PrivateKeyType,
  options: SignOptions = {}
) => {
  const accessTokenPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
  const refreshTokenPrivateKey = process.env
    .REFRESH_TOKEN_PRIVATE_KEY as string;
  let privateKey = "";
  if (keyName === "accessTokenPrivateKey") {
    privateKey = Buffer.from(accessTokenPrivateKey, "base64").toString("ascii");
  } else if (keyName === "refreshTokenPrivateKey") {
    privateKey = Buffer.from(refreshTokenPrivateKey, "base64").toString(
      "ascii"
    );
  }

  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: "RS256",
  });
};

const verifyJwt = <T>(token: string, keyName: PublicKeyType): T | null => {
  let publicKey = "";
  const accessTokenPublicKey = process.env.ACCESS_TOKEN_PUBLIC_KEY as string;
  const refreshTokenPublicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY as string;
  if (keyName === "accessTokenPublicKey") {
    publicKey = Buffer.from(accessTokenPublicKey, "base64").toString("ascii");
  } else if (keyName === "refreshTokenPublicKey") {
    publicKey = Buffer.from(refreshTokenPublicKey, "base64").toString("ascii");
  }

  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"],
  }) as T;
};

export { signJwt, verifyJwt };
