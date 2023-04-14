import { Field, InputType, ObjectType } from "type-graphql";
import { IsEmail, Max, MaxLength, MinLength } from "class-validator";

@InputType()
export class SignUpInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(30, { message: "Password must be less than 30 characters" })
  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  role?: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: "Invalid email or password" })
  @MaxLength(30, { message: "Invalid email or password" })
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateInput {
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  photo?: string;
}

@InputType()
export class ResetPasswordInput {
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(30, { message: "Password must be less than 30 characters long" })
  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  oldPassword: string;
}

@ObjectType()
export class UserData {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  photo: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class UserResponse {
  @Field(() => String)
  success: boolean;

  @Field(() => String)
  message?: string;

  @Field(() => UserData)
  user: UserData;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  success: boolean;

  @Field(() => String)
  message?: string;

  @Field(() => String)
  accessToken: string;
}

@ObjectType()
export class ApiResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message?: string;
}

@ObjectType()
export class ResetPasswordResponse extends ApiResponse {
  @Field(() => String)
  accessToken: string;
}
