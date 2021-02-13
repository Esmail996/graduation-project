const router = require("express").Router();

router.use("/auth", require("./auth/router"));

router.use("/api/restaurant", require("./restaurant/router"));

router.use("/api/user", require("./user/router"));

router.use("/api/menu", require("./menu/router"));

router.use("/api/category", require("./category/router"));

router.use("/api/dish", require("./dish/router"));

router.use("/api/table", require("./table/router"));

router.use("/api/order", require("./order/router"));

module.exports = router;
