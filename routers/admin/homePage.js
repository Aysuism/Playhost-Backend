const express = require('express');
const {
    slider_all_list, slider_single_list, slider_add, slider_edit, slider_delete,
    heroService_all_list, heroService_single_list, heroService_add, heroService_edit, heroService_delete,
    homeFooter_all_list, homeFooter_single_list, homeFooter_add, homeFooter_edit, homeFooter_delete,
    paymentMethod_all_list, paymentMethod_single_list, paymentMethod_add, paymentMethod_edit, paymentMethod_delete } = require('../../controllers/homePage');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

//========================================================================================== homePage.js -> sliderSchema

router.get('/slider', auth, slider_all_list);
router.get('/slider/:id', isAdmin, slider_single_list);
router.post('/slider', isAdmin, upload.single('backgroundImageUrl'), slider_add);
router.put('/slider/:id', isAdmin, upload.single('backgroundImageUrl'), slider_edit);
router.delete('/slider/:id', isAdmin, slider_delete);

//========================================================================================== homePage.js -> heroServiceSchema

router.get('/heroservice', auth, heroService_all_list);
router.get('/heroservice/:id', isAdmin, heroService_single_list);
router.post('/heroservice', isAdmin, upload.single('iconUrl'), heroService_add);
router.put('/heroservice/:id', isAdmin, upload.single('iconUrl'), heroService_edit);
router.delete('/heroservice/:id', isAdmin, heroService_delete);

//========================================================================================== homePage.js -> homeFooterSchema

router.get('/homefooter', auth, homeFooter_all_list);
router.get('/homefooter/:id', isAdmin, homeFooter_single_list);
router.post('/homefooter', isAdmin, upload.single('backgroundImageUrl'), homeFooter_add);
router.put('/homefooter/:id', isAdmin, upload.single('backgroundImageUrl'), homeFooter_edit);
router.delete('/homefooter/:id', isAdmin, homeFooter_delete);

//========================================================================================== homePage.js -> paymentMethodsSchema

router.get('/paymentmethod', auth, paymentMethod_all_list);
router.get('/paymentmethod/:id', isAdmin, paymentMethod_single_list);
router.post('/paymentmethod', isAdmin, paymentMethod_add);
router.put('/paymentmethod/:id', isAdmin, paymentMethod_edit);
router.delete('/paymentmethod/:id', isAdmin, paymentMethod_delete);

module.exports = router;