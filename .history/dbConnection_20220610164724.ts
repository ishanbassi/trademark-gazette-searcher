import knex  from "knex";
 
export const db =knex(require('./knexfile').production)

export const closeConnection = () => db.destroy()
