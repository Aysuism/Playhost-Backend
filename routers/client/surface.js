const express = require('express');
const {
    slider_all_list,
    heroService_all_list,
    homeFooter_all_list,
    paymentMethod_all_list } = require('../../controllers/homePage');
const {
    faqUp_all_list,
    faqDown_all_list } = require('../../controllers/faqPage');
const {
    contactUp_all_list,
    contactDown_all_list } = require('../../controllers/contactPage');
const {
    blog_all_list,
    newsUp_all_list,
    newsDown_all_list } = require('../../controllers/newsPage');
const {
    aboutusUp_all_list,
    introduction_all_list,
    team_all_list,
    customerReviews_all_list,
    counter_all_list } = require('../../controllers/aboutusPage');
const {
    games_all_list,
    games_single_list, 
    games_all_list_for_category,
    gameCustomerReviews_all_list} = require('../../controllers/gamesPage');
const { 
    category_all_list, 
    category_single_list} = require('../../controllers/gameCategory');
const { generalsettings_all_list } = require('../../controllers/generalSettings');
const { user_all_list } = require('../../controllers/user');
const auth = require('../../middlewares/auth');

const router = express.Router();

//========================================================================================== homePage.js -> sliderSchema

router.get('/slider', auth, slider_all_list);

//========================================================================================== homePage.js -> heroServiceSchema

router.get('/heroservice', auth, heroService_all_list);

//========================================================================================== homePage.js -> homeFooterSchema

router.get('/homefooter', auth, homeFooter_all_list);

//========================================================================================== homePage.js -> paymentMethodsSchema

router.get('/paymentmethod', auth, paymentMethod_all_list);

//========================================================================================== faqPage.js -> faqUpSchema

router.get('/faqup', auth, faqUp_all_list);

//========================================================================================== faqPage.js -> faqDownSchema

router.get('/faqdown', auth, faqDown_all_list);

//========================================================================================== contactPage.js -> contactUpSchema

router.get('/contactup', auth, contactUp_all_list);

//========================================================================================== contactPage.js -> contactDownSchema

router.get('/contactdown', auth, contactDown_all_list);

//========================================================================================== newsPage.js -> blogPageSchema

router.get('/newspage', auth, blog_all_list);

//========================================================================================== newsPage.js -> newsUpSchema

router.get('/newsup', auth, newsUp_all_list);

//========================================================================================== newsPage.js -> newsDownSchema

router.get('/newsdown', auth, newsDown_all_list);

//========================================================================================== aboutusPage.js -> aboutusUpSchema

router.get('/aboutusup', auth, aboutusUp_all_list);

//========================================================================================== aboutusPage.js -> introductionSchema

router.get('/introduction', auth, introduction_all_list);

//========================================================================================== aboutusPage.js -> teamSchema

router.get('/team', auth, team_all_list);

//========================================================================================== aboutusPage.js -> customerReviewsSchema

router.get('/customerreviews', auth, customerReviews_all_list);

//========================================================================================== aboutusPage.js -> counterSchema

router.get('/counter', auth, counter_all_list);

//========================================================================================== gamesPage.js -> gamesPageSchema

router.get('/games', auth, games_all_list);
router.get('/games/:id', auth, games_single_list);
router.get('/games/category/:id', auth, games_all_list_for_category);

//========================================================================================== gamesPage.js -> gameCustomerReviewsSchema

router.get('/gamecustomerreviews', auth, gameCustomerReviews_all_list);

//========================================================================================== gameCategory.js

router.get('/category', auth, category_all_list);
router.get('/category/:id', auth, category_single_list);

//========================================================================================== generalSettings.js

router.get('/generalsettings', auth, generalsettings_all_list);

//========================================================================================== user.js

router.get('/user', auth, user_all_list);

module.exports = router;
