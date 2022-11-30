import createError = require('http-errors');
import express = require('express');
import path = require('path');
import bodyParser = require("body-parser");
import logger = require('morgan');
import session = require('express-session')
import helmet = require("helmet");
const MemoryStore = require('memorystore')(session)
import multer = require('multer')
const cookieParser = require('cookie-parser')
const cors = require('cors')
import {verifyJWT} from "./routes/jwt/jwt";

// MEDIA UPLOAD
const media_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname  + '/client/dist/build/assets/media')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name + '_media_' + Date.now() + '.' + file.originalname.split('.').pop())
  }
}) 
const media_uploader = multer({ storage: media_storage })

// ROUTES IMPORT
import { user_endpoint } from './routes/user'
import { products_endpoint } from './routes/products'
import { product_add_on_endpoint } from './routes/productAddOn'
import { locations_endpoint } from './routes/locations'
import { medias_endpoint } from './routes/media';
import { customers_endpoint } from './routes/customers';
import { product_combinations } from "./routes/productCombinations";
import {blogs_endpoint} from "./routes/blog";


const  app = express();
const port = process.env.PORT || 3000;

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
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  }
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  app.use(
      cors({
        origin: ["https://spotted-out.rs/, https://www.spotted-out.rs/, https://spotted-webapp.herokuapp.com/"],
        allowedHeaders: ["Origin, X-Forwarded-Proto, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"],
        optionsSuccessStatus: 200
      })
  );
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())

// point to Angular app
app.use(express.static(process.cwd()+"/client/dist/build/"));
app.get('/*', (req,res) => {
  res.sendFile(process.cwd()+"/client/dist/build/index.html")
});

// TODO: separate routes for admin, shop and loggedUser in shop
// ROUTES LOGIC
const endpoint_start = '/api/'
app.post(endpoint_start + 'user/:action', user_endpoint)
app.post(endpoint_start + 'products/:action',  products_endpoint)
app.post(endpoint_start + 'locations/:action',   locations_endpoint)
app.post(endpoint_start + 'blogs/:action',   blogs_endpoint)
app.post(endpoint_start + 'medias/:action',  media_uploader.single('file'), medias_endpoint)
app.post(endpoint_start + 'customers/:action',  customers_endpoint)
app.post(endpoint_start + 'product_add_on/:action',  product_add_on_endpoint)
app.post(endpoint_start + 'product_combinations/:action',  product_combinations)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

module.exports = app;
