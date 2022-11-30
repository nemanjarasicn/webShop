"use strict";
exports.__esModule = true;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var session = require("express-session");
var helmet = require("helmet");
var MemoryStore = require('memorystore')(session);
var multer = require("multer");
var cookieParser = require('cookie-parser');
var cors = require('cors');
// MEDIA UPLOAD
var media_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/client/dist/build/assets/media');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + '_media_' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
var media_uploader = multer({ storage: media_storage });
// ROUTES IMPORT
var user_1 = require("./routes/user");
var products_1 = require("./routes/products");
var productAddOn_1 = require("./routes/productAddOn");
var locations_1 = require("./routes/locations");
var media_1 = require("./routes/media");
var customers_1 = require("./routes/customers");
var productCombinations_1 = require("./routes/productCombinations");
var blog_1 = require("./routes/blog");
var app = express();
var port = process.env.PORT || 3000;
app.use(session({
    secret: '<fwkmwo;aST_O1ad78aw}0^jD7ZEvUHBlkLimN5<',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 64800000
    }),
    proxy: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 64800000,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
    }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    app.use(cors({
        origin: ["https://spotted-out.rs/, https://www.spotted-out.rs/, https://spotted-webapp.herokuapp.com/"],
        allowedHeaders: ["Origin, X-Forwarded-Proto, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"],
        optionsSuccessStatus: 200
    }));
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
// point to Angular app
app.use(express.static(process.cwd() + "/client/dist/build/"));
app.get('/*', function (req, res) {
    res.sendFile(process.cwd() + "/client/dist/build/index.html");
});
// TODO: separate routes for admin, shop and loggedUser in shop
// ROUTES LOGIC
var endpoint_start = '/api/';
app.post(endpoint_start + 'user/:action', user_1.user_endpoint);
app.post(endpoint_start + 'products/:action', products_1.products_endpoint);
app.post(endpoint_start + 'locations/:action', locations_1.locations_endpoint);
app.post(endpoint_start + 'blogs/:action', blog_1.blogs_endpoint);
app.post(endpoint_start + 'medias/:action', media_uploader.single('file'), media_1.medias_endpoint);
app.post(endpoint_start + 'customers/:action', customers_1.customers_endpoint);
app.post(endpoint_start + 'product_add_on/:action', productAddOn_1.product_add_on_endpoint);
app.post(endpoint_start + 'product_combinations/:action', productCombinations_1.product_combinations);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(port, function () {
    console.log("Server listening on the port::" + port);
});
module.exports = app;
