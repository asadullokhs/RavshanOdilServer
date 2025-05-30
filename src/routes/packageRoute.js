const express = require("express");
const router = express.Router();
const packageCtrl = require("../controllers/packageCtrl");

router.post("/", packageCtrl.createPackage);
router.get("/", packageCtrl.getAllPackages);
router.get("/:id", packageCtrl.getPackageById);
router.put("/:id", packageCtrl.updatePackage);
router.delete("/:id", packageCtrl.deletePackage);

module.exports = router;