const controller = require("./controller");
const validator = require("./validator");
const { joiValidator, catchAsync, checkRoleMiddleware, authMiddleware, MulterStorage } = require("../../middlewares");
const router = require("express").Router();

/**********************
 * @Router /api/user  *
 **********************/

//MM-18
router.post("/invite", authMiddleware, checkRoleMiddleware(["admin"]), joiValidator(validator.invite), catchAsync(controller.invite));
//MM-19
router.post("/signup", joiValidator(validator.signup), catchAsync(controller.signup));

module.exports = router;
