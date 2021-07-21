const AuthChallenger = function (knex) {
  return function (username, password, cb) {
    let query = knex
      .select('user_name')
      .from('user')
      .where('user_name', username)
      .where('password', password);
      query
      .then((rows) => {
        
        if (rows.length === 1) {
          cb(null, true);
         
        } else {
          cb(null, false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
module.exports = AuthChallenger;
