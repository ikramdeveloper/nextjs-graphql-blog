import { Field, InputType, ObjectType } from "type-graphql";
import { MinLength } from "class-validator";
import { UserData } from "./user.schema";

@InputType()
export class PostInput {
  @MinLength(10, { message: "Title must be at least 10 characters long" })
  @Field(() => String)
  title: string;

  @MinLength(10, { message: "Content must be at least 10 characters long" })
  @Field(() => String)
  content: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  image: string;
}

@InputType()
export class UpdatePostInput {
  @MinLength(10, { message: "Title must be at least 10 characters long" })
  @Field(() => String, { nullable: true })
  title: string;

  @MinLength(10, { message: "Content must be at least 10 characters long" })
  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => String, { nullable: true })
  image: string;
}

@InputType()
export class PostFilter {
  @MinLength(2, { message: "Query must be at least 2 characters long" })
  @Field(() => String, { nullable: true })
  query?: string;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;
}

@ObjectType()
export class PostDataObj {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  image: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class PostPopulatedData extends PostDataObj {
  @Field(() => UserData)
  user: UserData;
}

@ObjectType()
export class PostData extends PostDataObj {
  @Field(() => String)
  user: string;
}

@ObjectType()
export class PostResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => PostData)
  post: PostData;
}

@ObjectType()
export class PostPopulatedResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => PostPopulatedData)
  post: PostPopulatedData;
}

@ObjectType()
export class PostListResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => Number)
  results: number;

  @Field(() => [PostPopulatedData])
  posts: PostPopulatedData[];
}

@ObjectType()
export class PostDeleteResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
