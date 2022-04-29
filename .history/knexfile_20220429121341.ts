export{}
require('dotenv').config()
require('ts-node/register')
console.log(process.env.NODE_ENV)
module.exports = {
    development:{
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                require:true,
                rejectUnauthorized: false
            }
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