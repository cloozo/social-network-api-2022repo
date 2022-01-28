const router = require("express").Router();
//
const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");
// const friendsRoutes = require("./friend-routes");

// router and users

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
// router.use("/friends", friendRoutes);
//export the router
module.exports = router;
