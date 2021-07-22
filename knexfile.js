// Update with your config settings.
require("dotenv").config();
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'noteapp',
      user:     'test',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  }

