//here we have the root router that would transfer requests to their specific router
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');


router.get('/',homeController.home);
router.use('/posts',require('./posts'));
router.use('/users',require('./users.js'));
router.use('/comments',require('./comments.js'));

module.exports = router;