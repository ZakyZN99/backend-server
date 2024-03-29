const router = require('express').Router();
const tagController = require('./controller');

router.get('/tags', tagController.index);
router.get('/tags/:id', tagController.search);
router.post('/tags', tagController.store);
router.put('/tags/:id', tagController.update);
router.delete('/tags/:id', tagController.destroy);

module.exports = router;