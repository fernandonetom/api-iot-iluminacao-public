// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE_DEV,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      // ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './api/src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      // ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './api/src/database/migrations',
      tableName: 'knex_migrations',
    },
  },
};
