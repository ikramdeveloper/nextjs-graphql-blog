import {
  getModelForClass,
  prop,
  pre,
  ModelOptions,
  Severity,
  index,
} from "@typegoose/typegoose";
import bcrypt, { hash } from "bcryptjs";

@pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password, 12);
  return next();
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1 })
export class User {
  readonly _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true, lowercase: true })
  email: string;

  @prop({ default: "user", lowercase: true })
  role: string;

  @prop({ required: true, select: false })
  password: string;

  @prop({ default: "default.jpeg" })
  photo: string;

  @prop({ default: true, select: false })
  isVerified: boolean;

  static async comparePasswords(userPassword: string, hashedPassword: string) {
    return await bcrypt.compare(userPassword, hashedPassword);
  }
}

const UserModel = getModelForClass<typeof User>(User);
export default UserModel;
