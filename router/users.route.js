const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controllers');
const usersController = new UsersController();

router.post('/up', usersController.userSignUp);
router.post('/in', usersController.userLogin);

module.exports = router;
