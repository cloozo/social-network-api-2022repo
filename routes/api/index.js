const router = require("express").Router();
//
const reactionRoutes = require("./reaction-routes");
const thoughtRoutes = require("./thought-routes");
//
const userRoutes = require("./user-routes");
// const friendsRoutes = require("./friend-routes");

// router and users
router.use("/reactions", reactionRoutes);
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
module.exports = router;
