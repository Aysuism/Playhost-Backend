const express = require('express');
const {
    contactUp_all_list, contactUp_single_list, contactUp_add, contactUp_edit, contactUp_delete,
    contactDown_all_list, contactDown_single_list, contactDown_add, contactDown_edit, contactDown_delete } = require('../../controllers/contactPage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== contactPage.js -> contactUpSchema

router.get('/contactup', auth, contactUp_all_list);
router.get('/contactup/:id', isAdmin, contactUp_single_list);
router.post('/contactup', isAdmin, upload.single('backgroundImageUrl'), contactUp_add);
router.put('/contactup/:id', isAdmin, upload.single('backgroundImageUrl'), contactUp_edit);
router.delete('/contactup/:id', isAdmin, contactUp_delete);

//========================================================================================== contactPage.js -> contactDownSchema

router.get('/contactdown', auth, contactDown_all_list);
router.get('/contactdown/:id', isAdmin, contactDown_single_list);
router.post('/contactdown', isAdmin, contactDown_add);
router.put('/contactdown/:id', isAdmin, contactDown_edit);
router.delete('/contactdown/:id', isAdmin, contactDown_delete);

module.exports = router;