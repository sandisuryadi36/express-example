const User = require('./apps/models/userModel');
const Controller = require('./apps/controllers/userController');
const router = require('express').Router();

router.get("/", Controller.index)
router.post("/user", Controller.create)


module.exports = router;