import Knex  from "knex";
export const db = Knex(require('./knexfile').development)

export const closeConnection = db.destroy()
