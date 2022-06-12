import knex  from "knex";
 
export const db =knex(require('./knexfile').production)
console.log('hi')
export const closeConnection = () => db.destroy()
