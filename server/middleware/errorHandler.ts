import { ValidationError } from "apollo-server-micro";

const handleCastError = (error: any) => {
  const message = `Invalid ${error.path} ${error.value}`;
  throw new ValidationError(message);
};

const handleValidationError = (error: any) => {
  const message = Object.values(error.errors).map((err: any) => err.message);
  throw new ValidationError(`Invalid input: ${message.join(", ")}`);
};

const errorHandler = (error: any) => {
  if (error.name === "CastError") handleCastError(error);
  if (error.name === "ValidationError") handleValidationError(error);
  throw error;
};

export default errorHandler;
