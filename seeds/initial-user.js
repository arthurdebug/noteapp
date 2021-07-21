
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, user_name: 'arthur', password:'12345'},
        {id: 2, user_name: 'clement', password:'23456'},
        {id: 3, user_name: 'sam', password:'34567'}
      ]);
    });
};
