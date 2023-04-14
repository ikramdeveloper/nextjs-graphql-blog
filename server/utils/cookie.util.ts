import { OptionsType } from "cookies-next/lib/types";

const accessTokenExpiresIn = 15;
const refreshTokenExpiresIn = 60;

const cookieOptions: OptionsType = {
  httpOnly: true,
  sameSite: "lax",
};

if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: accessTokenExpiresIn * 60,
  expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: refreshTokenExpiresIn * 60,
  expires: new Date(Date.now() + refreshTokenExpiresIn * 60 * 1000),
};

export {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
};
