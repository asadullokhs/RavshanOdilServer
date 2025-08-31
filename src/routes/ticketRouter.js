const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/ticketCtrl");
const authMiddlewear = require("../middleware/authMiddleware");


router.post("/", authMiddlewear, ticketCtrl.createTicket);
router.get("/", ticketCtrl.getAllTickets);
router.get("/:id", authMiddlewear, ticketCtrl.getTicketById);
router.put("/:id", authMiddlewear, ticketCtrl.updateTicket);
router.delete("/:id", authMiddlewear, ticketCtrl.deleteTicket);

module.exports = router;