import TokenModel from "../models/token.model";

const getToken = async (query: object) => {
  return await TokenModel.findOne(query);
};

const setToken = async (payload: object) => {
  await TokenModel.create(payload);
};

const deleteOneToken = async (query: object) => {
  await TokenModel.deleteOne(query);
};

const deleteManyTokens = async (query: object) => {
  await TokenModel.deleteMany(query);
};

export { getToken, setToken, deleteOneToken, deleteManyTokens };
