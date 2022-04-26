export{}
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
            server:"trademark-searcher",
            host : "ec2-3-229-252-6.compute-1.amazonaws.com",
            databasea : "d4k13ihf47c8t5",
            user : "jtbzrbhssfaodq",
            port : 5432,
            password :  "7dc44b67f3c46488f7cd94f9595c31f0b3df38142c1aee4a0f1000805ec4e90c"
        }
    }
    
  }