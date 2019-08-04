/*
  require pg for postgres
  require .env to get variables from proccess.env

  the conString will be the login/password/database for elephantSQL
  pool will automatically disconnect
*/
const fs = require('fs');
const path = require('path');
const pg = require('pg');
const tableCreation = require('./tableCreation.js');
require('dotenv').config();
const conString = process.env.POSTGRES_URL;
const pool = new pg.Pool({ connectionString: conString });

/* TO DO *
  try to initialize the db with node IF DOES NOT EXIST
*/

const dbinit = fs.readFileSync(path.resolve(__dirname, 'init_ol.sql')).toString();
pool.query(dbinit)
.then((res) => {
  console.log(res);
  pool.end();
})
.catch(err=>console.log(err))

// assume the database is initialized and all tables are set...

module.exports = pool;
