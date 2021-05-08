const Router = require("koa-router");
//const Router = require("koa-joi-router");
const controllers = require("./controller");

const passport = require('koa-passport');

const { UsersController } = require('./users/users.controler');
const UserValidator  = require('./users/users.validator');

const router = new Router();
//const routerjoi = new Routerjoi();

router.get('profile', passport.authenticate('jwt', { session: false }), UsersController.profile);
router.get('refresh/token', UsersController.refresh);
router.post('add', UsersController.createUser);
router.post('auth', UsersController.signIn);
router.get('', passport.authenticate('jwt', { session: false }), UsersController.userList);
router.put('photo', passport.authenticate('jwt', { session: false }), UsersController.updatePhoto);

// Authentication
//router.post("add", controllers.createUser);
//router.post('/', UserValidator.signUp, UsersController.createUser);
router.post("complete", controllers.createPass);
router.get("Profile", controllers.profile);
router.get("Activate-message", controllers.succsesMessage);
//router.post("auth", controllers.signIn);

// Pages
router.get("signin", controllers.signIn);
router.get("Password-recovery", controllers.passRecovery);
router.get("Succses-password-recovery", controllers.succsesPassRecovery)
router.get("Reset-password", controllers.newPass);
router.get("SignUp", controllers.signUp);
router.get("search", controllers.search);
router.get("admin", controllers.admin);
router.get("admin/:id/delete", controllers.deleteUser);
router.get("", controllers.list);

module.exports = {
  router,
  //routerjoi
};