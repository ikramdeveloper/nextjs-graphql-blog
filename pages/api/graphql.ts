import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Query, Resolver } from "type-graphql";
import cors from "cors";
import connectDB from "@/server/utils/connectDB";
import connectRedis from "@/server/utils/connectRedis";
import { resolvers } from "@/server/resolvers";
import auth from "@/server/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

const corsHandler = cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  origin: "*",
});

// Middleware to run cors configuration
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const schema = await buildSchema({
  resolvers,
  dateScalarMode: "isoDate",
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  context: ({ req, res }: { req: NextRequest; res: NextResponse }) => ({
    req,
    res,
    auth,
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, corsHandler);
  await connectDB();
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
