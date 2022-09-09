const express= require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../config/passport-local-strategy');

const postController = require('../controllers/post_controller');

router.post('/create',passportLocal.checkAuthentication,postController.create);
router.get('/destroy/:id',passportLocal.checkAuthentication,postController.destroy);

module.exports = router;