const crypto = require('crypto');

const db = require('../db');
const { User } = require('./user');

class UserDB {
  static async getUserById(id) {
    const userResponse = await db.query(`SELECT * FROM "user" WHERE id = ${id}`);

    if (!userResponse.rowCount) {
      throw new Error(`User with id: ${id}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async getUserByEmail(email) {
    const userResponse = await db.query(`SELECT * FROM "users" WHERE email = '${email}'`);

    if (!userResponse.rowCount) {
      throw new Error(`User with email: ${email}, does not exist`);
    }

    return new User(userResponse.rows[0]);
  }

  static async checkPassword(email, password) {
    const userResponse = await db.query(`SELECT * FROM "users" WHERE email = '${email}'`);
    const userResponse1 = await db.query(`SELECT * FROM "users"`);
    console.log('response ' + userResponse.rows[0].pass);

    if (!userResponse.rowCount) {
      return { message: `User with email: ${email}, does not exist`, flag: false };
    }

    const user = { ...userResponse.rows[0] };

    if (crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex') !== user.pass) {
      return { message: 'Incorect password', flag: false };
    }

    return { user: new User(user), flag: true };
  }

  static async createUser(fname, lname, username, password, email) {
    try{
        const checkEmail = await db.query(`
        SELECT * FROM "users" WHERE email = '${email}'`);

        if(checkEmail.rows[0].email === email){
            const error = new Error('User with the same email already exists');
            error.status = 400;
            throw error;
        }

        const passwordHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex');

        const createUserResponse = await db.query(`
        INSERT INTO "users" (fname, lname, pass, email) 
        VALUES ('${fname}', '${lname}', '${passwordHash}', '${email}') RETURNING *`)
      
        return new User(createUserResponse.rows[0]);
    } catch (err) {
        err.message
    }
  }

  static async userList() {
    const userListResponse = await db.query('SELECT * FROM "users"');

    const users = userListResponse.rows.map((userDb) => new User(userDb));

    return users;
  }

  static async updateUserPhoto(photoUrl, email) {
    await db.query(`
      UPDATE "users" SET photo = '${photoUrl}'
      WHERE email = '${email}'
    `);
  }
}

module.exports = { UserDB };