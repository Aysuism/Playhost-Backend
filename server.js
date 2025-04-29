const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectdb = require('./config/connectdb');
require('dotenv').config();

// starting middleware
app.use(cors());
app.use(express.json());
// ending middleware

// client routes starting
const surfaceRoute = require('./routers/client/surface.js');

app.use('/', surfaceRoute);
// client routes starting

// admin routes starting
const adHomePageRoute = require('./routers/admin/homePage');
const adFaqPageRoute = require('./routers/admin/faqPage');
const adContactPageRoute = require('./routers/admin/contactPage.js');
const adNewsPageRoute = require('./routers/admin/newsPage.js');
const adAboutusPageRoute = require('./routers/admin/aboutusPage.js');
const adGamesPageRoute = require('./routers/admin/gamesPage.js');
const adGameCategoryRoute = require('./routers/admin/gameCategory.js');
const adGeneralSettingsRoute = require('./routers/admin/generalSettings.js');
const adUserRoute = require('./routers/admin/user.js');
const adAuthRouter = require('./routers/admin/auth.js');

app.use('/ad/homepage', adHomePageRoute);
app.use('/ad/faqpage', adFaqPageRoute);
app.use('/ad/contactpage', adContactPageRoute);
app.use('/ad/newspage', adNewsPageRoute);
app.use('/ad/aboutuspage', adAboutusPageRoute);
app.use('/ad/gamespage', adGamesPageRoute);
app.use('/ad/gamecategory', adGameCategoryRoute);
app.use('/ad/generalsettings', adGeneralSettingsRoute);
app.use('/ad/user', adUserRoute);
app.use('/ad/signin', adAuthRouter);
// admin routes ending

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectdb();
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} port is running`);
});