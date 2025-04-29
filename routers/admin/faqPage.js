const express = require('express');
const {
    faqUp_all_list, faqUp_single_list, faqUp_add, faqUp_edit, faqUp_delete,
    faqDown_all_list, faqDown_single_list, faqDown_add, faqDown_edit, faqDown_delete } = require('../../controllers/faqPage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== faqPage.js -> faqUpSchema

router.get('/faqup', auth, faqUp_all_list);
router.get('/faqup/:id', isAdmin, faqUp_single_list);
router.post('/faqup', isAdmin, upload.single('backgroundImageUrl'), faqUp_add);
router.put('/faqup/:id', isAdmin, upload.single('backgroundImageUrl'), faqUp_edit);
router.delete('/faqup/:id', isAdmin, faqUp_delete);

//========================================================================================== faqPage.js -> faqDownSchema

router.get('/faqdown', auth, faqDown_all_list);
router.get('/faqdown/:id', isAdmin, faqDown_single_list);
router.post('/faqdown', isAdmin, faqDown_add);
router.put('/faqdown/:id', isAdmin, faqDown_edit);
router.delete('/faqdown/:id', isAdmin, faqDown_delete);

module.exports = router;