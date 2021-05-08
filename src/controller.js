
const { pool } = require("./db");
const crypto = require('crypto');
const passport = require('koa-passport');

const uploadS3 = require('./utils/uploadS3');
//const jwt = require('./utils/jwt');
const User = require('./models/user');
//const Token = require('./models/token');

const Redis = require("ioredis");
const redis = new Redis({
  port: 19458, 
  host: 'redis-19458.c251.east-us-mz.azure.cloud.redislabs.com',
  password: '5My1v1Vplrq1i2xb0zax9jcUNGc6elFn'
});
/*
const redis = new Redis({
  port: 19458, 
  host: process.env.REDIS_DB,
  password: process.env.REDIS_PASS
});
*/
async function signIn(ctx, next) {
  const user = ctx.request.body;
  console.log(user);
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }),
  function(req, res) {
    ctx.redirect('/');
  }(ctx, next);
 }

async function profile(ctx) {
  await ctx.render("personal", {
    title: "Profile",
  });
}
async function succsesMessage(ctx) {
  await ctx.render("complete-account__succses", {
    title: "Check E-mail",
  });
}
async function complete(ctx) {
  await createPass(ctx);
}
async function passRecovery(ctx) {
  await ctx.render("pass-recovery", {
    title: "Reset password",
  });
}
async function succsesPassRecovery(ctx) {
  await ctx.render("pass-recovery__succses", {
    title: "Succses password recovery",
  });
}

async function newPass(ctx) {
  await ctx.render("pass-recovery__new-pass", {
    title: "Reset password",
  });
}

async function signUp(ctx) {
  await ctx.render("signup", {
    title: "Sign up",
  });
}
async function search(ctx) {
  await ctx.render("search", {
    title: "Search",
  });
}

async function admin(ctx) {
  await showUsers(ctx);
}

async function list(ctx) {
  await ctx.render("_list", {
    title: "List",
  });
}

async function showUsers(ctx) {


  //const client = await pool.connect();
  
    //console.log(client);
    const usersResponse = await pool.query(`
    SELECT users.fname, users.lname, users.email, users.country, users.status, users.level, users.id 
    FROM users`);
    //await pool.end();

    //const getRedis = await redis.hgetall('*');

    //console.log(getRedis);
    
    await ctx.render('admin', {
      title: "Manage users",
      usersResponse: usersResponse.rows
    });
    console.log(usersResponse);
    ctx.body = usersResponse.rows;
};

async function deleteUser(ctx) {
  console.log(ctx.params);
  //const client = await pool.connect();
  await pool.query(`DELETE FROM users WHERE id=${ctx.params.id}`);
  //await client.end();

  //await redis.del(ctx.params.id);
    
  ctx.status = 200;
  ctx.redirect('/admin');
  await showUsers(ctx);
  
}

async function createUser(ctx) {
  //const client = await pool.connect();
  const body = ctx.request.body;
  console.log(ctx.request.body);
  console.log(body.fname, body.lname, body.email, body.username);

   const createUserResponse = await pool.query(`
    INSERT INTO users (fname, lname, email, login)
    VALUES ('${body.fname}', '${body.lname}', '${body.email}', '${body.username}')
    RETURNING id
  `);

  //console.log(createUserResponse.rows[0].id);
  //console.log(body.fname);

  //await client.end();

  //await redis.mset(createUserResponse.rows[0].id, JSON.stringify(body) );

  ctx.status = 200;
  //ctx.redirect('/complete');

}

async function createPass(ctx) {
  const body = ctx.request.body;
  console.log(body);
  body.password = crypto.pbkdf2Sync(body.password, 'salt', 100000, 64, 'sha256').toString('hex');
  console.log(body.password);
  
  const createUserResponse = await pool.query(`
    INSERT INTO users (pass)
    VALUES ('${body.password}')
    RETURNING id
  `);

  // await redis.mset(createUserResponse.rows[0].id, JSON.stringify(body) );
  console.log(body.password);
  ctx.status = 200;
}

async function login(ctx) {

  const userResponse = await pool.query(`
  SELECT * FROM "user" 
  WHERE email = '${body.email}'
  `);

  if (!userResponse.rowCount) {
    return { flag: false, message: `User with email: ${email} does not exist` };
  }
  
  const user = { ...userResponse.rows[0] };
  
  const passwordHash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha256').toString('hex');
  
  if (user.password === passwordHash) {
    return { user, flag: true };
  }
  
  return { flag: false, message: 'Incorrect password' };

}


module.exports = {
  signIn,
  profile,
  succsesMessage,
  complete,
  passRecovery,
  succsesPassRecovery,
  newPass,
  signUp,
  list,
  admin,
  deleteUser,
  createUser,
  createPass,
  search
};