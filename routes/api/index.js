const router = require("express").Router();
const userRoutes = require("./users-routes");
const thoughtRoutes = require("./thought-routes");
const friendsRoutes = require("./friend-routes");

// router and users
router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);
router.use("/friends", friendsRoutes);
//export the router
module.exports = router;
