export{}
require('dotenv').config()
module.exports = {
    
    production:{
        client:"pg",
        connection:{
        host : process.env.PROD_PG_HOST,
        port :process.env.PROD_PG_PORT ,
        user : process.env.PROD_PG_USER,
        password : process.env.PROD_PG_PASSWORD,
        database : process.env.PROD_PG_DATABASE
        }
    }
    
    
    
  }