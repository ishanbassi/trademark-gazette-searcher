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
        connection:"postgresql://admin YSQL:YaT7IvNnpwaoob6PQo6eXQLqaP1GpkYCQL@asia-south2.bd511340-0dbf-41a7-8594-fc95d9ec64b5.gcp.ybdb.io:5433/yugabyte?ssl=true&sslmode=verify-full&sslrootcert=./root.crt"
    }
    
    
    
  }