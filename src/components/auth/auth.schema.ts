import Joi from '@hapi/joi';

export const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Digite um e-mail válido",
    "any.required": "Email é um campo obrigatório"
  }),
  password: Joi.string().min(3).max(20).required().messages({
    "string.min": "A senha deve ter no mínimo 3 caracteres",
    "string.max": "A senha deve ter no máximo 20 caracteres",
    "any.required": "Senha é um campo obrigatório"
  })
})