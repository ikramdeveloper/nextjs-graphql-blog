import { Html, Head, Main, NextScript } from "next/document";
import dotenv from "dotenv-safe";
dotenv.config();

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="post-modal"></div>
      </body>
    </Html>
  );
}
