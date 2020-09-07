exports.up = function (knex) {
  // eslint-disable-next-line consistent-return
  return knex.schema.createTable('mqtt_user', (t) => {
    t.increments('id').primary();
    t.string('name', 255).notNullable();
    t.string('username', 255).notNullable();
    t.string('password', 255).notNullable();
    t.boolean('is_superuser').notNullable().defaultTo(false);
    t.decimal('latitude', null);
    t.decimal('longitude', null);
    t.integer('organization_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  }).then(() => knex('mqtt_user').insert({
    name: process.env.ROOT_NAME,
    username: process.env.ROOT_EMAIL,
    password: process.env.ROOT_PASS,
    organization_id: 1,
    user_id: 1,
  }));
};

exports.down = function (knex) {
  return knex.schema.dropTable('mqtt_user');
};
