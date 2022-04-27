export{}
require('dotenv').config()
require('ts-node/register')

module.exports = {
    development:{
        client: 'pg',
        connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'Ish@n20pp',
        database : 'tmgazette'
        }    
    },
    production:{
        client: "pg",
        connection: 
        {

            host : process.env.PG_HOST,
            database : process.env.PG_DATABASE,
            user : process.env.PG_USER,
            port : process.env.PG_PORT,
            password :process.env.PG_PASSWORD,
            ssl: {
                require:true,
                rejectUnauthorized: false
            }
        }
    }
    
  }