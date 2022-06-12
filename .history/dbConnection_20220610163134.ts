import knex  from "knex";
 
export const db =knex(require('./knexfile').production)
console.log(process.env)

export const closeConnection = () => db.destroy()
