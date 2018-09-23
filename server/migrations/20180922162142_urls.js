
exports.up = function(knex) {
  return knex.schema.createTable('urls', (table) => {
    table.increments('id').primary();
    table.string('destination', 2048).unique().notNullable();
    table.string('identifier').unique();
    table.dateTime('created_at');
    table.dateTime('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('urls');
};
