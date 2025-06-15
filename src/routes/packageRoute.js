const express = require("express");
const router = express.Router();
const packageCtrl = require("../controllers/packageCtrl");
const authMiddlewear = require("../middleware/authMiddleware");


router.post("/", authMiddlewear, packageCtrl.createPackage);
router.get("/", authMiddlewear, packageCtrl.getAllPackages);
router.get("/:id", authMiddlewear, packageCtrl.getPackageById);
router.put("/:id", authMiddlewear, packageCtrl.updatePackage);
router.delete("/:id", authMiddlewear, packageCtrl.deletePackage);

module.exports = router;