const router = require('express').Router();
const Controller = require('./apps/controllers/productController');
//import multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

router.get("/product", Controller.viewAll)
router.get("/product/:id", Controller.viewOne)
router.post("/product", upload.single("image"), Controller.create)
router.patch("/product/:id", upload.single("image"), Controller.update)
router.delete("/product/:id", Controller.drop)

module.exports = router;