export{}
require('dotenv').config()
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
    production:{
        client:"pg",
        connection:"postgresql://ishanbassi23:v2_3pn5p_5MJwPj6MQdFVGSWpL8HnjUg@db.bit.io/ishanbassi23/tmgazette"
    }
    
    
    
  }