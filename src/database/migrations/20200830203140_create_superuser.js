// eslint-disable-next-line func-names
require('dotenv').config();

exports.up = function (knex) {
  // eslint-disable-next-line consistent-return
  knex.schema.hasTable('super_users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('super_users', (t) => {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.string('email', 255).notNullable();
        t.string('password', 255).notNullable();
        t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        t.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
        t.string('tokenResetPassword', 255);
      }).then(() => knex('super_users').insert({
        name: process.env.ROOT_NAME,
        email: process.env.ROOT_EMAIL,
        password: process.env.ROOT_PASS,
      }));
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('super_users');
};
