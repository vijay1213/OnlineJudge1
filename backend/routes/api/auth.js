const express = require('express');
const router = express.Router()
const {Login} = require("../../Controllers/auth.js")
const {Register} = require("../../Controllers/auth.js")
const {Loginadmin} = require("../../Controllers/auth.js")


router.post("/login",Login)
router.post("/register",Register)
router.post("/loginadmin",Loginadmin)




module.exports = router;