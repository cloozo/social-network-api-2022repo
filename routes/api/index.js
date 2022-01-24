const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// router and users
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
//export the router
module.exports = router;
