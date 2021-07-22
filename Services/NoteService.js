class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  async add(info, user) {
    let query = await this.knex
      .select("id")
      .from("users")
      .where("users.user_name", user);

    console.log(query);

    if (query.length === 1) {
      await this.knex
        .insert({
          note: info,
          user_id: query[0].id,
        })
        .into("notes");
    } else {
      throw new Error(`Cannot add a note to a user that doesn't exist!`);
    }
  }

  list(user) {
    if (typeof user !== "undefined") {
      let query = this.knex
        .select("notes.id", "notes.note")
        .from("notes")
        .innerJoin("users", "notes.user_id", "users.id")
        .where("users.user_name", user)
        .orderBy("notes.id", "asc");

      return query.then((rows) => {
        console.log(rows, "pp");
        return rows.map((row) => ({
          id: row.id,
          note: row.note,
        }));
      });
    } else {
      let query = this.knex
        .select("users.user_name", "notes.id", "note")
        .from("notes")
        .innerJoin("users", "notes.user_id", "users.id");

      return query.then((rows) => {
        console.log(rows);
        const result = {};
        rows.forEach((row) => {
          if (typeof result[row.user_name] === "undefined") {
            result[row.user_name] = [];
          }
          result[row.user_name].push({
            id: row.id,
            note: row.note,
          });
        });
        return result;
      });
    }
  }
  update(id, info, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.user_name", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).update({
          note: info,
        });
      } else {
        throw new Error(`Cannot update a note if the user doesn't exist!`);
      }
    });
  }
  remove(id, user) {
    let query = this.knex
      .select("id")
      .from("users")
      .where("users.user_name", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).del();
      } else {
        throw new Error(`Cannot remove a note when the user doesn't exist!`);
      }
    });
  }
}

module.exports = NoteService;