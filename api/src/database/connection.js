require('dotenv').config();
const knex = require('knex');
const config = require('../../knexfile');

console.log(`Ambiente: ${process.env.DEV === 'true' ? 'Desenvolvimento' : 'Produção'}`);
const db = knex(process.env.DEV === 'true' ? config.development : config.production);

module.exports = db;
