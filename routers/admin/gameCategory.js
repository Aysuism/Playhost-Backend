const express = require('express');
const { category_all_list, category_single_list, category_add, category_edit, category_delete } = require('../../controllers/gameCategory');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

router.get('/category', auth, category_all_list);
router.get('/category/:id', auth, category_single_list);
router.post('/category', isAdmin, category_add);
router.put('/category/:id', isAdmin, category_edit);
router.delete('/category/:id', isAdmin, category_delete);

module.exports = router;