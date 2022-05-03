import knex  from "knex";
export const db = process.env.NODE_ENV == "production" ? knex(require('./knexfile').production) : knex(require('./knexfile').development)

export const closeConnection = () => db.destroy()
