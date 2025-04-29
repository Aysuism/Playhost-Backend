const express = require('express');
const {
    blog_all_list, blog_single_list, blog_add, blog_edit, blog_delete,
    newsUp_all_list, newsUp_single_list, newsUp_add, newsUp_edit, newsUp_delete,
    newsDown_all_list, newsDown_single_list, newsDown_add, newsDown_edit, newsDown_delete } = require('../../controllers/newsPage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== newsPage.js -> blogPageSchema

router.get('/blogpage', auth, blog_all_list);
router.get('/blogpage/:id', isAdmin, blog_single_list);
router.post('/blogpage', isAdmin, upload.single('imageUrl'), blog_add);
router.put('/blogpage/:id', isAdmin, upload.single('imageUrl'), blog_edit);
router.delete('/blogpage/:id', isAdmin, blog_delete);

//========================================================================================== newsPage.js -> newsUpSchema

router.get('/newsup', auth, newsUp_all_list);
router.get('/newsup/:id', isAdmin, newsUp_single_list);
router.post('/newsup', isAdmin, upload.single('backgroundImageUrl'), newsUp_add);
router.put('/newsup/:id', isAdmin, upload.single('backgroundImageUrl'), newsUp_edit);
router.delete('/newsup/:id', isAdmin, newsUp_delete);

//========================================================================================== newsPage.js -> newsDownSchema

router.get('/newsdown', auth, newsDown_all_list);
router.get('/newsdown/:id', isAdmin, newsDown_single_list);
router.post('/newsdown', isAdmin, newsDown_add);
router.put('/newsdown/:id', isAdmin, newsDown_edit);
router.delete('/newsdown/:id', isAdmin, newsDown_delete);

module.exports = router;