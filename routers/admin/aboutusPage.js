const express = require('express');
const {
    aboutusUp_all_list, aboutusUp_single_list, aboutUsUp_add, aboutusUp_edit, aboutusUp_delete,
    introduction_all_list, introduction_single_list, introduction_add, introduction_edit, introduction_delete,
    team_all_list, team_single_list, team_add, team_edit, team_delete,
    customerReviews_all_list, customerReviews_single_list, customerReviews_add, customerReviews_edit, customerReviews_delete,
    counter_all_list, counter_single_list, counter_add, counter_edit, counter_delete } = require('../../controllers/aboutusPage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== aboutusPage.js -> aboutusUpSchema

router.get('/aboutusup', auth, aboutusUp_all_list);
router.get('/aboutusup/:id', isAdmin, aboutusUp_single_list);
router.post('/aboutusup', isAdmin, upload.single('backgroundImageUrl'), aboutUsUp_add);
router.put('/aboutusup/:id', isAdmin, upload.single('backgroundImageUrl'), aboutusUp_edit);
router.delete('/aboutusup/:id', isAdmin, aboutusUp_delete);

//========================================================================================== aboutusPage.js -> introductionSchema

router.get('/introduction', auth, introduction_all_list);
router.get('/introduction/:id', isAdmin, introduction_single_list);
router.post('/introduction', isAdmin, upload.single('imageUrl'), introduction_add);
router.put('/introduction/:id', isAdmin, upload.single('imageUrl'), introduction_edit);
router.delete('/introduction/:id', isAdmin, introduction_delete);

//========================================================================================== aboutusPage.js -> teamSchema

router.get('/team', auth, team_all_list);
router.get('/team/:id', isAdmin, team_single_list);
router.post('/team', isAdmin, upload.single('teamImage'), team_add);
router.put('/team/:id', isAdmin, upload.single('teamImage'), team_edit);
router.delete('/team/:id', isAdmin, team_delete);

//========================================================================================== aboutusPage.js -> customerReviewsSchema

router.get('/customerreviews', auth, customerReviews_all_list);
router.get('/customerreviews/:id', isAdmin, customerReviews_single_list);
router.post('/customerreviews', isAdmin, upload.single('avatarUrl'), customerReviews_add);
router.put('/customerreviews/:id', isAdmin, upload.single('avatarUrl'), customerReviews_edit);
router.delete('/customerreviews/:id', isAdmin, customerReviews_delete);

//========================================================================================== aboutusPage.js -> counterSchema

router.get('/counter', auth, counter_all_list);
router.get('/counter/:id', isAdmin, counter_single_list);
router.post('/counter', isAdmin, counter_add);
router.put('/counter/:id', isAdmin, counter_edit);
router.delete('/counter/:id', isAdmin, counter_delete);

module.exports = router;