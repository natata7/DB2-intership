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
