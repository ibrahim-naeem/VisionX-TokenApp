const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '@Pakistan_45',
    database: 'users',
    host: 'localhost',
    port: 5432
})

module.exports = pool;