/*const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      user: 'fplcjdjr',
      host: 'hattie.db.elephantsql.com',
      database: 'fplcjdjr',
      password: 'c2tn6TyFMJzpECha2QLSzQGePEfuLjwC',
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}
module.exports = new Database();
*/
const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}
module.exports = new Database();
