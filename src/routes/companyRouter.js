const express = require("express");
const router = express.Router();
const companyCtrl = require("../controllers/companyCtrl");

router.post("/", companyCtrl.addCompany);
router.get("/", companyCtrl.getAllCompanies);
router.get("/:id", companyCtrl.getCompanyById);
router.put("/:id", companyCtrl.updateCompany);
router.delete("/:id", companyCtrl.deleteCompany);

module.exports = router;