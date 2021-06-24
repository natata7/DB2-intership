/*
const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      user: 'nata',
      host: 'localhost',
      database: 'DB2',
      password: '1111',
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
