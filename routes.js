const router = require('express').Router();
const ControllerV1 = require('./apps/controllers/v1Controller');
const ControllerV2 = require('./apps/controllers/productController');
//import multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

//route using mongoDB native driver
router.get("/v1/product", ControllerV1.viewAll)
router.get("/v1/product/:id", ControllerV1.viewOne)
router.post("/v1/product", upload.single('image'), ControllerV1.create)
router.put("/v1/product/:id", upload.single('image'), ControllerV1.update)
router.delete("/v1/product/:id", ControllerV1.remove)

// route using mongoose
router.get("/v2/product", ControllerV2.viewAll)
router.get("/v2/product/:id", ControllerV2.viewOne)
router.post("/v2/product", upload.single("image"), ControllerV2.create)
router.put("/v2/product/:id", upload.single("image"), ControllerV2.update)
router.delete("/v2/product/:id", ControllerV2.remove)

module.exports = router;