
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
async function list(ctx) {
  await ctx.render("_list", {
    title: "List",
  });
}

async function createUser(ctx) {
  const { body } = ctx.request;
  await validator.schema.validateAsync(body);
  const createUserResponse = await db.query(
    `INSERT INTO "users" (fname, lname, login, email) VALUES 
    ('${body.fname}', '${body.lname}', '${body.login}', '${body.email}') RETURNING *`
  );
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
};