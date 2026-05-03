const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/stats", auth, (req, res) => {
  res.json({
    totalRevenue: 97200,
    totalOrders: 880,
    activeUsers: 3412,
    totalProducts: 142,
  });
});

module.exports = router;
