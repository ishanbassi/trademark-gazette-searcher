import knex  from "knex";
export const db = knex(require('./knexfile').development)
console.log(db.client)
export const closeConnection = () => db.destroy()
