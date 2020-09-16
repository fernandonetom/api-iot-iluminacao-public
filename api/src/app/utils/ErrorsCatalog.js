const ErrorsCatalog = {
  unAuthorized: {
    tokenNotFound: { error: "unauthorized", message: "Token não informado" },
    invalidToken: { error: "invalid token", message: "Token inválido" },
    notPermissions: {
      error: "unauthorized",
      message: "Você não tem permissão para executar essa ação",
    },
  },
  organization: {
    idNotFound: { error: "ID not informed", message: "ID não informado" },
    notFound: {
      error: "Organization not founded",
      message: "Organização não encontrada",
    },
  },
  user: {
    notFound: { error: "User not founded", message: "Usuário não encontrado" },
    notInformed: {
      error: "User not informed",
      message: "Usuário não informado",
    },
  },
  superuser: {
    userNotFound: {
      error: "Superuser not found",
      message: "Super usuário não encontrado",
    },
  },
  storage: {
    typeNotAllowed: { error: "Invalid type", message: "Tipo não permitido" },
    invalidData: {
      error: "Invalid data",
      message: "Formado dos dados está inválido",
    },
    dateAfter: {
      error: "Invalid data",
      message: "Data de inicio é maior que a do fim",
    },
    dateEqual: {
      error: "Invalid data",
      message: "As datas de início e fim são iguais",
    },
  },
  mqttUsers: {
    notFound: {
      error: "Mqtt user not founded",
      message: "Usuário mqtt não encontrado",
    },
  },
  emailInUser: { error: "Email already in use", message: "Email em uso" },
  emailInvalid: { error: "Inválid email", message: "Email inválido" },
  nullData: {
    error: "Null data",
    message: "Campos obrigatório estão em branco",
  },
  server: (error) => ({
    error: error.message,
    message: "Tente novamente mais tarde",
  }),
};

module.exports = ErrorsCatalog;
