const User = require('./apps/models/userModel');
const Controller = require('./apps/controllers/userController');
const router = require('express').Router();

router.get('/', Controller.index)
router.get("/user", Controller.viewAll)
router.post("/user", Controller.create)
router.put("/user/:id", Controller.update)
router.delete("/user/:id", Controller.deleteUser)

module.exports = router;