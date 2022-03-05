const Controller = require('./apps/controllers/userController');
const router = require('express').Router();
//import multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

router.get('/', Controller.index)
router.get("/user", Controller.viewAll)
router.get("/user/:id", Controller.viewOne)
router.post("/user", upload.single("avatar"), Controller.create)
router.put("/user/:id", upload.single("avatar"), Controller.update)
router.delete("/user/:id", Controller.deleteUser)

module.exports = router;