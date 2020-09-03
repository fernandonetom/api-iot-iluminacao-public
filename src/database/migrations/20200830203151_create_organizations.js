exports.up = function (knex) {
  // eslint-disable-next-line consistent-return
  knex.schema.hasTable('organizations').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('organizations', (t) => {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.string('email', 255).notNullable();
        t.string('password', 255).notNullable();
        t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        t.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
        t.string('tokenResetPassword', 255);
        t.integer('superuser_id')
          .notNullable()
          .references('id')
          .inTable('super_users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('organizations');
};
