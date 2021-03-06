exports.up = function (knex) {
  // eslint-disable-next-line consistent-return
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (t) => {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.string('email', 255).notNullable();
        t.string('password', 255).notNullable();
        t.enu('level', ['admin', 'user']).defaultTo('user');
        t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        t.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
        t.string('tokenResetPassword', 255);
        t.integer('organization_id')
          .notNullable()
          .references('id')
          .inTable('organizations')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      }).then(() => knex('users').insert({
        name: process.env.ROOT_NAME,
        email: process.env.ROOT_EMAIL,
        password: process.env.ROOT_PASS,
        organization_id: 1,
        level: 'admin',
      }));
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
