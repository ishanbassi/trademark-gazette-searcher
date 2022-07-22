import knex  from "knex";
 
export const db =knex(require('./knexfile').development)

export const closeConnection = () => db.destroy()
