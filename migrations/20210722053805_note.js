
exports.up = function(knex) {
    return knex.schema.createTable('notes',table=>{
        table.increments();
        table.string('note');
        table.integer('users_id').unsigned();
        table.foreign('users_id').references('users.id');
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
