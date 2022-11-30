"use strict";
exports.__esModule = true;
exports.killCookie = exports.verifyJWT = exports.simpleVerifyJWT = exports.giveAccess = void 0;
var jwt = require('jsonwebtoken');
var secret = '{wXRt3EJ1as56das15$32dz6[|McoL-S%s';
var options = {
    algorithm: 'HS512',
    expiresIn: '16h',
    header: {
        typ: 'JWT'
    }
};
var giveAccess = function (req, payload) {
    req.session.jwt = jwt.sign(payload, secret, options);
};
exports.giveAccess = giveAccess;
var simpleVerifyJWT = function (token) {
    try {
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        return jwt.verify(token, secret, options);
    }
    catch (e) {
        //if an error occured return request unauthorized error
        console.log(e);
        return false;
    }
};
exports.simpleVerifyJWT = simpleVerifyJWT;
var verifyJWT = function (req, res, next) {
    var accessToken = req.session.jwt;
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken) {
        console.log("ACCESS NOT OK, NO TOKEN");
        return res.status(403).send();
    }
    var payload;
    try {
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, secret, options);
        console.log("ACCESS OK");
        next();
    }
    catch (e) {
        //if an error occured return request unauthorized error
        console.log("ACCESS NOT OK");
        console.log(e);
        return res.status(401).send();
    }
};
exports.verifyJWT = verifyJWT;
var killCookie = function (req) {
    req.session.destroy();
};
exports.killCookie = killCookie;
