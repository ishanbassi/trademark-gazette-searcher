export{}
require('dotenv').config()
require('ts-node/register')
console.log(process.env.NODE_ENV)
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
            connectionString: process.env.DATABASE_URL,
            ssl: {
                require:true,
                rejectUnauthorized: false
            }
        }
    }
    
  }