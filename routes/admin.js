const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createCategory, listCategories, listUsers } = require('../controllers/adminController');

router.use(protect);
router.use(admin);

router.post('/categories', createCategory);
router.get('/categories', listCategories);
router.get('/users', listUsers);

module.exports = router;
