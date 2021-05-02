const Router = require("koa-router");
const controllers = require("./controller");
const router = new Router();

router.get("signin", controllers.signIn);
router.post("add", controllers.createUser);
router.post("complete", controllers.createPass);
router.get("Profile", controllers.profile);
router.get("Activate-message", controllers.succsesMessage);
router.get("complete", controllers.complete);
router.get("Password-recovery", controllers.passRecovery);
router.get("Succses-password-recovery", controllers.succsesPassRecovery)
router.get("Reset-password", controllers.newPass);
router.get("SignUp", controllers.signUp);
router.get("search", controllers.search);
router.get("admin", controllers.admin);
router.get("admin/:id/delete", controllers.deleteUser);
router.get("", controllers.list);

module.exports = {
  router
};