
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, note: 'hi', users_id:1},
        {id: 2, note: 'hi hi', users_id:2},
        {id: 3, note: 'hi hi hi', users_id:3}
      ]);
    });
};
