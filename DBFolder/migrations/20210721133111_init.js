
exports.up = function(knex,Promise) {
  return ([
    knex.schema.createTable('user',table=>{
      table.increments();
      table.string('user_name').unique();
      table.string('password');
      
  }),
  knex.schema.createTable('notes',table=>{
    table.increments();
    table.string('note');
    table.string('user_id').unsigned();
    table.foreign('user_id').references('user.id');
  })
])
};

exports.down = function(knex,Promise) {
  return ([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('notes')
  ]);
};
