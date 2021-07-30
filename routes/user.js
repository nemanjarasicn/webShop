"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.user_endpoint = void 0;
var mysql_1 = require("./db/mysql");
var _TB_NAME = "`user`";
var setSession = function (req, user_id, time) {
    req.session.cookie.expires = new Date(Date.now() + time);
    req.session.cookie.maxAge = time;
    req.session.logged = true;
    req.session.userid = user_id;
};
var makeSession = function (req, user_id) {
    var hour = 3600000;
    setSession(req, user_id, hour);
};
var saveMe = function (req, user_id) {
    var year = Number(3600000 * 24 * 365);
    setSession(req, user_id, year);
};
var getUserData = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (res, rej) {
                var sql = "SELECT `id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`  FROM " + _TB_NAME + " WHERE `id` = ?";
                var queryParams = [user_id];
                mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                    if (error)
                        rej(false);
                    res(JSON.parse(JSON.stringify([true, results[0]] || [false, null])));
                });
            })];
    });
}); };
var logout = function (req) {
    return new Promise(function (res, rej) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                return rej(false);
            }
            res(true);
        });
    });
};
var login = function (params, req) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT `id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`  FROM " + _TB_NAME + " WHERE `rule_id` = ? AND `username` = ? AND `password` = SHA2(?, 256)";
                queryParams = [1, params.username, params.password];
                return [4 /*yield*/, new Promise(function (res, rej) {
                        mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                            if (error)
                                rej(false);
                            res(JSON.parse(JSON.stringify(results[0] || false)));
                        });
                    })];
            case 1:
                user = _a.sent();
                if (user !== false) {
                    makeSession(req, user.id);
                    if (params.save_me)
                        saveMe(req, user.id);
                }
                return [2 /*return*/, user];
        }
    });
}); };
function user_endpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var action, returnValue, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    action = req.params.action;
                    returnValue = undefined;
                    _a = action;
                    switch (_a) {
                        case 'isAlreadyLogged': return [3 /*break*/, 1];
                        case 'login': return [3 /*break*/, 5];
                        case 'logout': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    if (!(req.session.userid !== undefined && req.session.logged === true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getUserData(req.session.cookie.userid || req.session.userid)];
                case 2:
                    returnValue = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    returnValue = [false, null];
                    _b.label = 4;
                case 4:
                    res.status(200);
                    return [3 /*break*/, 10];
                case 5: return [4 /*yield*/, login(req.body, req)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 10];
                case 7: return [4 /*yield*/, logout(req)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 10];
                case 9:
                    res.status(404);
                    return [3 /*break*/, 10];
                case 10:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.user_endpoint = user_endpoint;
