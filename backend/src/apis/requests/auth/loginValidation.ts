import Joi from "joi";

export interface LoginRequestData {
  email: string;
  password: string;
}

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
