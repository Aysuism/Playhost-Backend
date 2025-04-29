const express = require('express');
const { generalsettings_all_list, generalsettings_single_list, generalsettings_add, generalsettings_edit, generalsettings_delete } = require('../../controllers/generalSettings');

const upload = require('../../middlewares/uploadFile');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/isAdmin');
const router = express.Router();

router.get('/generalsettings', auth, generalsettings_all_list);
router.get('/generalsettings/:id', isAdmin, generalsettings_single_list);

router.post('/generalsettings', isAdmin, upload.fields([
    { name: 'favIcon', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), generalsettings_add);

router.put('/generalsettings/:id', isAdmin, upload.fields([
    { name: 'favIcon', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]), generalsettings_edit);

router.delete('/generalsettings/:id', isAdmin, generalsettings_delete);

module.exports = router;