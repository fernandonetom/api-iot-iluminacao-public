exports.up = function (knex) {
  return knex.schema.createTable('dados_alerta', (t) => {
    t.increments('id').primary();
    t.decimal('valor').notNullable();
    t.integer('mqtt_user_id')
      .notNullable()
      .references('id')
      .inTable('mqtt_user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('dados_alerta');
};
