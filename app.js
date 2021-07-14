"use strict";
exports.__esModule = true;
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");
var session = require("express-session");
var multer = require("multer");
var media_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/client/dist/build/assets/media');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + '_media_' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
var media_uploader = multer({ storage: media_storage });
var user_1 = require("./routes/user");
var products_1 = require("./routes/products");
var locations_1 = require("./routes/locations");
var media_1 = require("./routes/media");
var app = express();
var sesssionOpt = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: app.get('env') === 'production' ? true : false,
        maxAge: null,
        sameSite: true
    }
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}
app.use(session(sesssionOpt));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'dist', 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
var endpoint_start = '/api/';
//routes
app.post(endpoint_start + 'user/:action', user_1.user_endpoint);
app.post(endpoint_start + 'products/:action', products_1.products_endpoint);
app.post(endpoint_start + 'locations/:action', locations_1.locations_endpoint);
app.post(endpoint_start + 'medias/:action', media_uploader.single('file'), media_1.medias_endpoint);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
