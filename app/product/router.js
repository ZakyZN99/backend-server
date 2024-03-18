const router = require('express').Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.search);
router.post('/product', multer({dest: os.tmpdir()}).single('image_url'), productController.store);
router.put('/product/:id', multer({dest: os.tmpdir()}).single('image_url'), productController.update);
router.delete('/product/:id', multer({dest: os.tmpdir()}).single('image_url'), productController.destroy);

module.exports = router;