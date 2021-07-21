class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  async add(note, user) {
    let query = await this.knex
      .select("id")
      .from("user")
      .where("user.user_name", user);

    console.log(query);

    if (query.length === 1) {
      await this.knex
        .insert({
          content: note,
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
        .innerJoin("user", "notes.user_id", "user.id")
        .where("user.user_name", user)
        .orderBy("notes.id", "asc");

      return query.then((rows) => {
        console.log(rows, "pp");
        return rows.map((row) => ({
          id: row.id,
          content: row.note,
        }));
      });
    } else {
      let query = this.knex
        .select("user.user_name", "notes.id", "note")
        .from("notes")
        .innerJoin("user", "notes.user_id", "user.id");

      return query.then((rows) => {
        console.log(rows);
        const result = {};
        rows.forEach((row) => {
          if (typeof result[row.user_name] === "undefined") {
            result[row.user_name] = [];
          }
          result[row.user_name].push({
            id: row.id,
            content: row.note,
          });
        });
        return result;
      });
    }
  }
  update(id, note, user) {
    let query = this.knex
      .select("id")
      .from("user")
      .where("user.user_name", user);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex("notes").where("id", id).update({
          content: note,
        });
      } else {
        throw new Error(`Cannot update a note if the user doesn't exist!`);
      }
    });
  }
  remove(id, user) {
    let query = this.knex
      .select("id")
      .from("user")
      .where("user.user_name", user);

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