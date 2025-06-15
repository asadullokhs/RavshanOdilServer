const express = require("express");
const router = express.Router();
const companyCtrl = require("../controllers/companyCtrl");
const authMiddlewear = require("../middleware/authMiddleware");


router.post("/", authMiddlewear, companyCtrl.addCompany);
router.get("/", authMiddlewear, companyCtrl.getAllCompanies);
router.get("/:id", authMiddlewear, companyCtrl.getCompanyById);
router.put("/:id", authMiddlewear, companyCtrl.updateCompany);
router.delete("/:id", authMiddlewear, companyCtrl.deleteCompany);

module.exports = router;