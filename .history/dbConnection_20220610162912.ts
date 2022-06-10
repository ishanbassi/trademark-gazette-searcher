import knex  from "knex";
 
export const db =knex(require('./knexfile').production)
console.log(process.env.NODE_ENV)

export const closeConnection = () => db.destroy()
