import {
  getModelForClass,
  prop,
  ModelOptions,
  index,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@index({ uid: 1, userId: 1 })
export class Token {
  @prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @prop({ required: true })
  token: string;

  @prop({ required: true, unique: true })
  uid: string;
}

const TokenModel = getModelForClass(Token);

export default TokenModel;
