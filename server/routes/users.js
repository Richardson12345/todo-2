var controller = require("../controller/userController");
var express = require('express');
var router = express.Router();

router.post('/signup', controller.signup );
router.post('/signin', controller.signin);
router.post('/fbsignin', controller.fbSignIn);
router.get('/', function(req, res, next) {
    res.io.emit("socketToMe", "users");
    res.send('respond with a resource.');
  });
  

module.exports = router;
