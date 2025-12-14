const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, clear } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getCart);
router.post('/add', addItem);
router.post('/update', updateItem);
router.post('/remove', removeItem);
router.delete('/clear', clear);

module.exports = router;
