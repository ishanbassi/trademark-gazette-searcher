export{}
require('dotenv').config()
require('ts-node/register')
console.log(process.env)
module.exports = {
    development:{
        client: 'pg',
        connection: {
        host : process.env.DEV_PG_HOST,
        port :process.env.DEV_PG_PORT ,
        user : process.env.DEV_PG_USER,
        password : process.env.DEV_PG_PASSWORD,
        database : process.env.DEV_PG_DATABASE
        }    
    },
    
    
  }