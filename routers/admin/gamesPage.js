const express = require('express');
const { games_all_list, games_single_list, games_all_list_for_category, games_add, games_edit, games_delete,  
    gameCustomerReviews_all_list, gameCustomerReviews_single_list, gameCustomerReviews_add, gameCustomerReviews_edit, gameCustomerReviews_delete} = require('../../controllers/gamesPage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== gamesPage.js -> gamesPageSchema

router.get('/games', auth, games_all_list);
router.get('/games/:id', auth, games_single_list);
router.get('/games/category/:id', auth, games_all_list_for_category);

router.post('/games', isAdmin, upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'backgroundImageUrl', maxCount: 1 }
]), games_add);

router.put('/games/:id', isAdmin, upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'backgroundImageUrl', maxCount: 1 }
]), games_edit);

router.delete('/games/:id', isAdmin, games_delete);

//========================================================================================== gamesPage.js -> customerReviewsSchema

router.get('/gamecustomerreviews', auth, gameCustomerReviews_all_list);
router.get('/gamecustomerreviews/:id', isAdmin, gameCustomerReviews_single_list);
router.post('/gamecustomerreviews', isAdmin, upload.single('avatarUrl'), gameCustomerReviews_add);
router.put('/gamecustomerreviews/:id', isAdmin, upload.single('avatarUrl'), gameCustomerReviews_edit);
router.delete('/gamecustomerreviews/:id', isAdmin, gameCustomerReviews_delete);

module.exports = router;