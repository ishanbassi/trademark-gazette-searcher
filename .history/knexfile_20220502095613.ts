export{}
require('dotenv').config()

module.exports = {
    development:{
        client: 'pg',
        connection: {
        host : process.env.DEV_PG_HOST,
        port :process.env.DEV_PG_PORT ,
        user : 'postgres',
        password : process.env.DEV_PG_PASSWORD,
        database : process.env.DEV_PG_DATABASE
        }    
    },
    
    
    
  }