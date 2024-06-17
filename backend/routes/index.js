const router = require('express').Router();
const auth = require('./api/auth.js');
const admin = require('./api/admin.js');
const submit = require('./api/submit.js');
const question = require('./api/question.js');
const submissions = require('./api/submissions.js');
const run = require('./api/run.js');


// API routes
router.get('/', (req, res) => {
  res.send("<h1>Hello API work</h1>");
}); // API root, test if the RESTful API is working

router.use('/api/auth', auth); // sign up, login, change password
router.use('/api/admin', admin); // manage questions, users, data
router.use('/api/submit', submit); // submit solution
router.use('/api/questions', question); // question management
router.use('/api/submissions', submissions); // question submissions
router.use('/api/run', run);

module.exports = router;
