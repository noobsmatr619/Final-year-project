const express = require("express");
const router = express.Router();
const {
  addNewMachine,
  getAllMachines,
  goOnMaintainanceMood,
  getMaintainanceMoodMachines,
  updateMachineTarget,
} = require("./../controllers/admin/machine");
router.post("/addNewMachine", addNewMachine);
router.get("/getAllMachines", getAllMachines);
router.get("/getMaintainanceMoodMachines", getMaintainanceMoodMachines);
router.post("/goOnMaintainanceMood", goOnMaintainanceMood);
router.post("/updateMachineTarget", updateMachineTarget);
module.exports = router;
