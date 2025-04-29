const express = require('express');
const { user_all_list, user_single_list, user_add, user_edit, user_delete } = require('../../controllers/user');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');

const router = express.Router();

router.get('/user', auth, user_all_list);
router.get('/user/:id', isAdmin, user_single_list);
router.post('/user', isAdmin, user_add);
router.put('/user/:id', isAdmin, user_edit);
router.delete('/user/:id', isAdmin, user_delete);

module.exports = router;