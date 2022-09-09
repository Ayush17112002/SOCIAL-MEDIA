const express = require('express');
const passportLocal = require('../config/passport-local-strategy');
const router = express.Router();
const commentController = require('../controllers/comment_controller');

router.post('/create',commentController.create);
router.get('/destroy/:id',passportLocal.checkAuthentication, commentController.destroy);
module.exports = router;