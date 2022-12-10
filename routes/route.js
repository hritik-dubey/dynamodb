const express = require('express');
const router = express.Router();
let controller  = require("../controller/controller")
router.post("/createRecords",controller.createRecords)
router.post("/createCondition",controller.createCondition)
<<<<<<< HEAD
// gti added comment  
=======

>>>>>>> 460c170f8ddfc7025e3a75ca16c81efc36e1e162
module.exports = router; 