const db = require('./db');

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
  await ctx.render("admin", {
    title: "Manage users",
  });
}

async function list(ctx) {
  await ctx.render("_list", {
    title: "List",
  });
}

async function showUsers(ctx) {
  const usersResponse = await db.query(`SELECT users.fname, users.lname, users.email
  FROM users
  GROUP BY users.fname, users.lname, users.email`);
  console.log('hello db ' + usersResponse.fields[0].fname);
  await ctx.render('admin', { 
    'usersResponse': usersResponse.rows
  });
};


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
  admin
};