import knex  from "knex";

const dbConfiguration = process.env.NODE_ENV == 'production' ? require('./knexfile').production : require('./knexfile').development;

export const db =  knex(dbConfiguration); 

export const closeConnection = () => db.destroy()
