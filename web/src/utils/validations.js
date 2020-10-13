/* eslint-disable no-template-curly-in-string */
import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "${path} é inválido",
    required: "Campo obrigatório",
    oneOf: "${path} deve ser um dos seguintes valores: ${values}",
    notOneOf: "${path} não pode ser um dos seguintes valores: ${values}",
  },
  string: {
    length: "${path} deve ter exatamente ${length} caracteres",
    min: "Deve ter pelo menos ${min} caracteres",
    max: "${path} deve ter no máximo ${max} caracteres",
    email: "E-mail inválido",
    url: "${path} deve ter um formato de URL válida",
    trim: "${path} não deve conter espaços no início ou no fim.",
    lowercase: "${path} deve estar em maiúsculo",
    uppercase: "${path} deve estar em minúsculo",
  },
  number: {
    min: "${path} deve ser no mínimo ${min}",
    max: "${path} deve ser no máximo ${max}",
    lessThan: "${path} deve ser menor que ${less}",
    moreThan: "${path} deve ser maior que ${more}",
    notEqual: "${path} não pode ser igual à ${notEqual}",
    positive: "${path} deve ser um número positivo",
    negative: "${path} deve ser um número negativo",
    integer: "${path} deve ser um número inteiro",
  },
  date: {
    min: "${path} deve ser maior que a data ${min}",
    max: "${path} deve ser menor que a data ${max}",
  },
  array: {
    min: "${path} deve ter no mínimo ${min} itens",
    max: "${path} deve ter no máximo ${max} itens",
  },
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(4),
});
export const updateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
    .when("password", {
      is: (password) => password && password,
      then: yup.string().required("Confirme sua senha"),
    }),
});
export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
    .when("password", {
      is: (password) => password && password,
      then: yup.string().required("Confirme sua senha"),
    }),
});
