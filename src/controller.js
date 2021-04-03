
const { pool } = require("./db");
const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT, 
  host: process.env.REDIS_DB,
  password: process.env.DATABASE_PASS
});


async function signIn(ctx) {
  await ctx.render("signin", {
    title: "Sign in",
  });
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
  await ctx.render("complete-account", {
    title: "Complete account",
  });
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

async function admin(ctx) {
  await showUsers(ctx);
}

async function list(ctx) {
  await ctx.render("_list", {
    title: "List",
  });
}

async function showUsers(ctx) {
  const client = await pool.connect();
  
  try{
    const usersResponse = await client.query(`
    SELECT users.fname, users.lname, users.email, users.country, users.status, users.level, users.id 
    FROM users`);
    console.log(usersResponse.rows);

    const getRedis = await redis.hgetall('*');

    console.log(getRedis);
    
    await ctx.render('admin', {
      title: "Manage users",
      usersResponse: usersResponse.rows
    });
  } finally {
    
  }
};

async function deleteUser(ctx) {
  console.log(ctx.params);
  const client = await pool.connect();
  await client.query(`DELETE FROM users WHERE id=${ctx.params.id}`);

  await redis.del(ctx.params.id);
    
  ctx.status = 200;
  ctx.redirect('/admin');
  await showUsers(ctx);
  
}

async function createUser(ctx) {
  const client = await pool.connect();
  const body = ctx.request.body;

  const createUserResponse = await client.query(`
    INSERT INTO users (fname, lname, email, login)
    VALUES ('${body.fname}', '${body.lname}', '${body.email}', '${body.login}')
    RETURNING id
  `);

  console.log(createUserResponse.rows[0].id);
  console.log(body.fname);

  await redis.mset(createUserResponse.rows[0].id, JSON.stringify(body) );

  ctx.status = 200;
  ctx.redirect('/complete');

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
  createUser
};