const Router = require("koa-router");
const controllers = require("./controller");
const router = new Router();

router.get("SignIn", controllers.signIn);
router.get("Profile", controllers.profile);
router.get("Activate-message", controllers.succsesMessage);
router.get("Complete", controllers.complete);
router.get("Password-recovery", controllers.passRecovery);
router.get("Succses-password-recovery", controllers.succsesPassRecovery)
router.get("Reset-password", controllers.newPass);
router.get("SignUp", controllers.signUp);
router.get("admin", controllers.admin);
router.get("", controllers.list);

module.exports = {
  router
};