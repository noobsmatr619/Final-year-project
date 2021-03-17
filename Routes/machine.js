const express = require('express');
const router = express.Router();
const {
  addNewMachine,
  getAllMachines,
  getAllMachinesWithAnyStatus,
  getSingleMachineDetails,
  goOnMaintainanceMood,
  getMaintainanceMoodMachines,
  updateMachineTarget,
  updateMachineInformation
} = require('./../controllers/admin/machine');
router.post('/addNewMachine', addNewMachine);
router.get('/getAllMachines', getAllMachines);
router.get('/getAllMachinesWithAnyStatus', getAllMachinesWithAnyStatus);
router.get('/getSingleMachineDetails/:machineId', getSingleMachineDetails);
router.get('/getMaintainanceMoodMachines', getMaintainanceMoodMachines);
router.post('/goOnMaintainanceMood', goOnMaintainanceMood);
router.post('/updateMachineTarget', updateMachineTarget);
router.put('/updateMachineInformation', updateMachineInformation);
module.exports = router;
