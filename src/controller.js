
const { pool } = require("./db");


async function signIn(ctx) {
  await ctx.render("signIn", {
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
  await ctx.render("signUp", {
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
  let result = await client.query(`DELETE FROM users WHERE id=${ctx.params.id}`);
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
    RETURNING *
  `);

  ctx.status = 200;
  ctx.redirect('/complete');

  //const user = { ...createUserResponse.rows[0] };

  // await ctx.redis.set(category.num, JSON.stringify(category));
/*
  ctx.status = 201;
  ctx.body = {
    id: users.id,
    fname: users.fname,
    lname: users.lname,
    email: users.email,
    country: users.country
  }; */
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