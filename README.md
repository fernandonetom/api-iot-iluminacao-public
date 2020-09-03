<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">API IOT PARA ILUMINAÇÃO PÚBLICA INTELIGENTE</h3>

  <p align="center">
    API criada como projeto para o trabalho de conclusão de curso
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Sumário

- [Sumário](#sumário)
- [Sobre o projeto](#sobre-o-projeto)
  - [Feito com](#feito-com)
- [Começando](#começando)
  - [Requesíto](#requesíto)
  - [Instalação](#instalação)
- [Configurações](#configurações)
- [Uso](#uso)
- [Rotas](#rotas)
  - [Super User](#super-user)
    - [Super User Login](#super-user-login)
    - [Super User Criar organização](#super-user-criar-organização)
    - [Super User Atualizar organização](#super-user-atualizar-organização)
    - [Super User Excluir uma organização](#super-user-excluir-uma-organização)
    - [Super User Listar organizações](#super-user-listar-organizações)
  - [Organizations](#organizations)
    - [Organizations Login](#organizations-login)
    - [Organizations Criar usuário](#organizations-criar-usuário)
    - [Organizations Atualizar usuário](#organizations-atualizar-usuário)
    - [Organizations Excluir uma usuário](#organizations-excluir-uma-usuário)
    - [Organizations Listar usuários](#organizations-listar-usuários)
  - [Users](#users)
    - [Users Login](#users-login)
    - [Users Criar usuário MQTT](#users-criar-usuário-mqtt)
    - [Users Atualizar usuário MQTT](#users-atualizar-usuário-mqtt)
    - [Users Excluir uma usuário MQTT](#users-excluir-uma-usuário-mqtt)
    - [Users Listar usuários MQTT](#users-listar-usuários-mqtt)
    - [Users Listar __storage__ de um dispositivo](#users-listar-storage-de-um-dispositivo)
  - [Storage](#storage)
    - [Storage salvar dado](#storage-salvar-dado)
- [Storage](#storage-1)
    - [Tipos de dados](#tipos-de-dados)
    - [Listagem de dados](#listagem-de-dados)
      - [Listagem para "hoje"](#listagem-para-hoje)
      - [Listagem para "data" específica](#listagem-para-data-específica)
      - [Listagem para "paríodo"](#listagem-para-paríodo)
- [Erros e mesagens](#erros-e-mesagens)
- [Licença](#licença)
- [Contato](#contato)




<!-- ABOUT THE PROJECT -->
## Sobre o projeto

A API foi criada com 4 camadas de usuários sendo eles: superuser, organizations, users e mqtt_user.


### Feito com

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Knex.js](http://knexjs.org/)
* [Moment.js](https://momentjs.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)



<!-- GETTING STARTED -->
## Começando

Copie o respositório seguindo os passos abaixos:

### Requesíto

Atualize para a última versão do NPM.
* npm
```sh
npm install npm@latest -g
```

### Instalação

1. Clone o repositório
```sh
git clone https://github.com/fernandonetom/api-iot-iluminacao-public.git
```
2. Acesse o diretório do projeto e instale os pacotes NPM
```sh
cd api-iot-iluminacao-public && npm install
```

## Configurações

Crie um arquivo __.env__ com o seu editor preferido, por exemplo:
```sh
vim .env
```

Dados de exemplo:
```
DB_HOST=localhost
DB_DATABASE_DEV=api_database_developer
DB_DATABASE=api_database_production
DB_USER=_api_database_user
DB_PASSWORD=api_api_database_password
DB_PORT=api_database_port
SECRET=sajhdjsahd
ROOT_EMAIL=youremail@youremail.com
ROOT_PASS="dsdsdss"
ROOT_NAME="Your Name"
DEV=true
```

| CONFIGURAÇÃO    | DESCRIÇÃO                                                                                                                                                  |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DB_HOST         | Servidor do banco PostreSQL                                                                                                                                |
| DB_DATABASE_DEV | Base de dados de desenvolvimento                                                                                                                           |
| DB_DATABASE     | Base de dados de produção                                                                                                                                  |
| DB_USER         | Usário do banco de dados                                                                                                                                   |
| DB_PASSWORD     | Senha do banco de dados                                                                                                                                    |
| DB_PORT         | Porta do banco de dados                                                                                                                                    |
| SECRET          | Hash para a criação dos tokens                                                                                                                             |
| ROOT_EMAIL      | Email do usuário root                                                                                                                                      |
| ROOT_PASS       | Senha do usuário root                                                                                                                                      |
| ROOT_NAME       | Nome do usuário root                                                                                                                                       |
| DEV             | True: Ativa o modo de desenvolvimento (usa a base da dados de desenvolvimento) False: Desativa o modo de desenvolvimento (usa a base da dados de produção) |

<!-- USAGE EXAMPLES -->
## Uso

Após ter configurado o arquivo __.env__, é necessário rodar a criação das tabelas no banco de dados, isso vai criar o usuário root automaticamente de acordo com as configurações feitas no arquivo __.env__.
```sh
knex migrate:latest
```

Finalmente execute a aplicação:
```sh
npm run dev
```


<!-- ROADMAP -->
## Rotas

A __{url}__ é http://localhost:3000, todas os corpo das requisições e respostas são no formato JSON.

### Super User

#### Super User Login

| GET                 | {url}/superuser/signin                                                                                                                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Corpo da requisição | { 	"email": "youremail@youremail.com", 	"password": "dsdsdss" }                                                                                                                              |
| Resposta            | {   "superUserId": 1,   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" } |


#### Super User Criar organização

| POST                 | {url}/superuser/organizations                                                                                                                                                       |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "Organization Example", 	"email": "orgemail@orgemail.com", 	"password": "pass", 	"superUserId": "1" }                                                                        |
| Resposta             | {   "organizationId": 1 }                                                                                                                                                           |

#### Super User Atualizar organização

| PUT                  | {url}/superuser/organizations/{organizationId}                                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "Empresa", 	"email": "mail@mail.com", 	"password": "123" //Se deixado em branco não vai alterar a senha }                                                            |
| Resposta             | {   "message": "Atualizado com sucesso" }                                                                                                                                           |
#### Super User Excluir uma organização

| DELETE               | {url}/superuser/organizations/{organizationId}                                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Resposta             | {   "message": "Excluido com sucesso" }                                                                                                                                             |

#### Super User Listar organizações

| GET                  | {url}/superuser/organizations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"                                                                                                                                                                                                                                                                                                                                                            |
| Resposta             | [   {     "id": 1,     "name": "Empresa 1",     "email": "mail@mail.com",     "createdAt": "2020-09-01T12:36:57.926Z",     "lastLogin": "2020-09-03T01:24:45.000Z",  "superuser_id": 1   },   {     "id": 2,     "name": "Empresa 2",     "email": "mail2@mail.com",     "createdAt": "2020-09-01T12:36:57.926Z",     "lastLogin": "2020-09-03T01:24:45.000Z",  "superuser_id": 1   }  ]  |

### Organizations

#### Organizations Login
| GET                 | {url}/organizations/signin                                                                                                                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Corpo da requisição | { 	"email": "youremail@youremail.com", 	"password": "dsdsdss" }                                                                                                                              |
| Resposta            | {   "organizationId": 1,   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" } |

#### Organizations Criar usuário

| POST                 | {url}/users                                                                                                                                                       |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "User Example", 	"email": "usermail@usermail.com", 	"password": "pass", 	"organizationId": "1", 	"admin": "true" //deixe em branco para user comum}                                                                        |
| Resposta             | {   "userId": 1 }                                                                                                                                                           |

#### Organizations Atualizar usuário

| PUT                  | {url}/users/{userId}                                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "Empresa", 	"email": "mail@mail.com", 	"password": "123" //Se deixado em branco não vai alterar a senha , "admin": "true" //deixe em branco para user comum}                                                            |
| Resposta             | {   "message": "Atualizado com sucesso" }


#### Organizations Excluir uma usuário

| DELETE               | {url}/users/{userId}                                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Resposta             | {   "message": "Excluido com sucesso" }                                                                                                                                             |

#### Organizations Listar usuários

| GET                  | {url}/users                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"                                                                                                                                                                                                                                                                                                                                                            |
| Resposta             | [   {     "id": 1,     "name": "Usuário 1",     "email": "mail@mail.com","leve": "admin",     "createdAt": "2020-09-01T12:36:57.926Z",     "lastLogin": "2020-09-03T01:24:45.000Z",     "organization_id": 1   },   {     "id": 2,     "name": "Empresa 2",     "email": "mail2@mail.com", "leve": "user",     "createdAt": "2020-09-01T12:36:57.926Z",     "lastLogin": "2020-09-03T01:24:45.000Z",     "organization_id": 1   }  ]  |

### Users
#### Users Login
| GET                 | {url}/users/signin                                                                                                                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Corpo da requisição | { 	"email": "youremail@youremail.com", 	"password": "dsdsdss" }                                                                                                                              |
| Resposta            | {   "userId": 1,   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" } |

#### Users Criar usuário MQTT

| POST                 | {url}/mqttusers                                                                                                                                                       |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "Poste zona 2", 	"latitude": "-8.05428" //opcional, se em branco ficará nulo, 	"longitude": "-34.8813" //opcional, se em branco ficará nulo}                                                                        |
| Resposta             | {   "mqttUserID": 1, "name": "Poste zona 2", "username": "a5b6c7", "password": "d4c8v3",  	"latitude": -8.05428, "longitude": -34.8813, "user_id": 1, "organization_id": 1}                                                                                                                                                           |

#### Users Atualizar usuário MQTT

| PUT                  | {url}/mqttusers/{mqttusersId}                                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"name": "Poste atualizado", "latitude": "-8.05428" //opcional, se em branco não será alterado, 	"longitude": "-34.8813" //opcional, //opcional, se em branco não será alterado}                                                            |
| Resposta             | {   "message": "Atualizado com sucesso" }


#### Users Excluir uma usuário MQTT

| DELETE               | {url}/mqttusers/{mqttusersId}                                                                                                                                      |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Resposta             | {   "message": "Excluido com sucesso" }                                                                                                                                             |

#### Users Listar usuários MQTT

| GET                  | {url}/mqttusers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"                                                                                                                                                                                                                                                                                                                                                            |
| Resposta             | [   {     "id": 1,     "name": "Poste 1",     "username": "a5b6c7","password": "d4c8v3",  "latitude": -35.05, "longitude": -19.05641, "organization_id": 1, "user_id": 1,   "createdAt": "2020-09-01T12:36:57.926Z"},   {     "id": 2,     "name": "Poste 2 atualizado",     "username": "a5b4d7","password": "d5s9as",  "latitude": null, "longitude": null, "organization_id": 1, "user_id": 1,   "createdAt": "2020-09-01T12:36:57.926Z"}  ]  |

#### Users Listar __storage__ de um dispositivo
| GET                  | {url}/mqttusers/list/{tipoDoDado}                                                                                                                                                                                                                                                 |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"                                                                                           |
| Corpo da requisição  | { 	"id": "2", //Id do dispositivo 	"rangeType": "data", //Range pode ser: hoje, data. periodo 	"data": "2020-09-02", //Obrigatório para range "data" 	"dataInicio": "2020-09-01", //Obrigatório para range "periodo" 	"dataFim": "2020-09-02" //Obrigatório para range "periodo" } |
| Resposta             | Consulte em [Tipos de dados](#tipos-de-dados)                                                                                                                                                                                                                                                                    |

### Storage

#### Storage salvar dado

Consulte os tipos de dados em: [Tipos de dados](#tipos-de-dados)

| POST                 | {url}/storage/create/{tipoDoDado}                                                                                                                                                                     |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Corpo da requisição | { 	"id": "1", 	"valor":"25" }                                                                                                                              |
| Resposta            | {   "dataId": 1" } |

## Storage
Responsável pela arquivação e listagem dos dados.

#### Tipos de dados

Como o objetivo da API foi para o sistema de iluminação pública inteligente, os seguintes dados podem ser coletados:
| Tipo do dado | Descrição                                           | Valor                     |
|--------------|-----------------------------------------------------|---------------------------|
| alerta       | Guarda os alertas enviados                          | 1 (cada alerta)           |
| movimentacao | Guarda as detecções de movimentação                 | 1 (cada movimentação)     |
| temperatura  | Guarda os dados de temperatura coletado             | decimal (Ex.: 25.6, 30.2) |
| umidade      | Guarda os dados de umidade coletado                 | decimal (Ex.: 90.5, 88.7) |
| luminosidade | Guarda os dados de luminosidade coletado            | decimal (Ex.: 90.5, 88.7) |
| tensao       | Guarda os dados de tensão da bateria do dispositivo | decimal (Ex.: 12.5, 13.7) |

#### Listagem de dados

##### Listagem para "hoje"
Lista os dados para a data atual, os dados de alerta e movimentação não são coletados eventualmente (ex. de 30 em 30 minutos) são representados por hora, ou seja se entre 12:00h e 13:00h teve 5 movimentações/alertas a resposta será dada abaixo:

Exemplo de requisição:
| GET                  | {url}/storage/list/alerta                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "hoje" }                                                                                                                                                  |

Exemplo da resposta:
```
[
  {
    "hora": "0:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "1:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "2:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  ...
  {
    "hora": "12:00",
    "data": "2020-09-02",
    "quantidade": "5"
  },
  ...
  {
    "hora": "22:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "23:00",
    "data": "2020-09-02",
    "quantidade": "0"
  }
]
```

Já o restante dos dados é representado de acordo com a inserção do dado, ou seja:

Exemplo de requisição:
| GET                  | {url}/storage/list/temperatura                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "hoje" }                                                                                                                                                  |


Exemplo da resposta:
```
[
  {
    "valor": "25.60",
    "hora": "20:42",
    "data": "2020-09-02"
  },
  {
    "valor": "24.4",
    "hora": "21:42",
    "data": "2020-09-02"
  }
]
```

##### Listagem para "data" específica

Bem parecido com a listagem para "hoje", a única difereça é que a data deve ser informada, ja listando para "hoje" ele pega para a data atual. Os dados de alerta e movimentação não são coletados eventualmente (ex. de 30 em 30 minutos) são representados por hora, ou seja se entre 12:00h e 13:00h teve 5 movimentações/alertas a resposta será dada abaixo:

Exemplo de requisição:
| GET                  | {url}/storage/list/alerta                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "data", "data": "2020-09-02" }                                                                                                                                                  |

Exemplo da resposta:
```
[
  {
    "hora": "0:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "1:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "2:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  ...
  {
    "hora": "12:00",
    "data": "2020-09-02",
    "quantidade": "5"
  },
  ...
  {
    "hora": "22:00",
    "data": "2020-09-02",
    "quantidade": "0"
  },
  {
    "hora": "23:00",
    "data": "2020-09-02",
    "quantidade": "0"
  }
]
```

Já o restante dos dados é representado de acordo com a inserção do dado, ou seja:

Exemplo de requisição:
| GET                  | {url}/storage/list/temperatura                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "data", "data": "2020-09-02" }                                                                                                                                                  |


Exemplo da resposta:
```
[
  {
    "valor": "25.60",
    "hora": "20:42",
    "data": "2020-09-02"
  },
  {
    "valor": "24.4",
    "hora": "21:42",
    "data": "2020-09-02"
  }
]
```


##### Listagem para "paríodo"

Os dados serão mostrados por dia, ou seja, se ele reunirá todos os dados em um dia (alertas e movimentações será feito em quantidade, o restante dos tipos de dados será efetuado uma média). Exemplos abaixo:


Exemplo de requisição:
| GET                  | {url}/storage/list/alerta                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "periodo", "dataInicio": "2020-09-01", "dataFim": "2020-09-03" }                                                                                                                                                  |


Exemplo da resposta:
```
[
  {
    "data": "2020-09-01",
    "quantidade": "10"
  },
  {
    "data": "2020-09-03",
    "quantidade": "2"
  }
]
```

Perceba que o dia 03 não foi mostrado pois não há dados no dia.

Exemplo de requisição:
| GET                  | {url}/storage/list/temperatura                                                                                                                                                           |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Header da requisição | Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" |
| Corpo da requisição  | { 	"id": "2", 	"rangeType": "periodo", "dataInicio": "2020-09-01", "dataFim": "2020-09-03" }                                                                                                                                                  |

Exemplo da resposta:
```
[
  {
    "data": "2020-09-01",
    "quantidade": "26.667"
  },
  {
    "data": "2020-09-03",
    "quantidade": "28.452"
  }
]
```
Perceba que o dia 03 não foi mostrado pois não há dados no dia.

## Erros e mesagens
| Código | Messagem                                       | Descrição                                                                                |
|--------|------------------------------------------------|------------------------------------------------------------------------------------------|
| 200    | Criado com sucesso                             | Operação realizada                                                                       |
| 200    | Excluido com sucesso                           | Dado excluido                                                                            |
| 200    | Atualizado com sucesso                         | Dado atualizado com sucesso                                                              |
| 400    | ID não informado                               | O ID da organização, usuário, etc, não foi informado                                     |
| 400    | Tipo não permitido                             | Tipo não permitido (consulte em [tipos de dados](#tipos-de-dados)                                                          |
| 400    | Formado dos dados está inválido                | Formado dos dados está inválido (consulte em [listagem de dados](#listagem-de-dados))                        |
| 400    | Data de inicio é maior que a do fim            | Data de inicio é maior que a do fim ex.: início 2020-09-02 e fim 2020-09-01              |
| 400    | As datas de início e fim são iguais            | As datas de início e fim devem ser diferentes para listar um período                     |
| 400    | Email em uso                                   | Email utilizado por outro usuário                                                        |
| 400    | Email inválido                                 | Deve ser no formado email@provedor.com                                                   |
| 400    | Campos obrigatório estão em branco             | Campos obrigatório estão em branco                                                       |
| 401    | Token não informado                            | O token não foi informado na requisição                                                  |
| 401    | Token inválido                                 | Token inválido ou já expirado                                                            |
| 401    | Você não tem permissão para executar essa ação | Você não é administrador ou não pode alterar por exemplo um usuário que não lhe pertence |
| 404    | Organização não encontrada                     | Organização não encontrada no banco de dados                                             |
| 404    | Usuário não encontrado                         | Usuário não encontrado no banco de dados                                                 |
| 404    | Super usuário não encontrado                   | Super usuário não encontrado no banco de dados                                           |
| 404    | Usuário mqtt não encontrado                    | Usuário mqtt não encontrado no banco de dados                                            |
| 500    | Tente novamente mais tarde                     | Erro interno do servidor                                                                 |



<!-- LICENSE -->
## Licença

Licença MIT. Veja o arquivo `LICENSE` para mais informações.



<!-- CONTACT -->
## Contato

Fernando Neto - [fernando.neto@cear.ufpb.br](mailto:fernando.neto@cear.ufpb.br)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/fernandonetom/api-iot-iluminacao-public.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fernandonetom/api-iot-iluminacao-public.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/fernandonetom/api-iot-iluminacao-public.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/fernandonetom/api-iot-iluminacao-public.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/fernandonetom/api-iot-iluminacao-public.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
