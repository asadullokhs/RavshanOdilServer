const express = require("express");
const router = express.Router();
const orderCtrl = require("../controllers/orderCtrl");

router.post("/", orderCtrl.createOrder);
router.get("/", orderCtrl.getAllOrders);
router.get("/:id", orderCtrl.getOrderById);
router.delete("/:id", orderCtrl.deleteOrder);

module.exports = router;