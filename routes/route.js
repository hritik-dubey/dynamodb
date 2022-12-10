const express = require('express');
const router = express.Router();
let controller  = require("../controller/controller")
router.post("/createRecords",controller.createRecords)
router.post("/createCondition",controller.createCondition)

module.exports = router; 