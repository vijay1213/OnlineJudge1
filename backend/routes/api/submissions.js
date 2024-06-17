const express = require('express');
const { getSubmissions } = require('../../controllers/mysubmissions');
const router = express.Router();


router.get("/mysubmissions/:uniquename",getSubmissions)

module.exports = router;


