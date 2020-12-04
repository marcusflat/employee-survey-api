import Joi from '@hapi/joi';

export const CreateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "O nome deve ter no mínimo 3 letras",
    "string.max": "O nome deve ter no máximo 30 letras",
    "any.required": "Nome é um campo obrigatório"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Digite um e-mail válido",
    "any.required": "Email é um campo obrigatório"
  }),
  password: Joi.string().min(3).max(20).required().messages({
    "string.min": "A senha deve ter no mínimo 3 caracteres",
    "string.max": "A senha deve ter no máximo 20 caracteres",
    "any.required": "Senha é um campo obrigatório"
  }),
  passwordConfirmation: Joi.any().valid(Joi.ref('password')).required()
});