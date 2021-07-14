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
exports.locations_endpoint = void 0;
//@ts-ignore
var pool = require('./db/mysql');
var _TB_NAME_ = "`location`";
var getAll = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_;
        pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingle = function (id) {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_ +
            " WHERE `id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results[0] || null)));
        });
    });
};
var deleteItem = function (id) {
    return new Promise(function (res, rej) {
        var sql = "DELETE FROM " + _TB_NAME_ + " WHERE `id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var update = function (params) {
    return new Promise(function (res, rej) {
        var sql = "UPDATE " + _TB_NAME_ + "  SET `name` = ?, `delivery_tax` = ? WHERE `id` = ?";
        var queryParams = [params.name, params.delivery_tax, params.id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var insert = function (params) {
    return new Promise(function (res, rej) {
        var sql = "INSERT INTO " + _TB_NAME_ + " (`name`, `delivery_tax`) VALUES ( ?, ? )";
        var queryParams = [params.name, params.delivery_tax];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
function locations_endpoint(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var action, params, returnValue, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    action = req.params.action;
                    params = req.body;
                    returnValue = undefined;
                    console.log(action, params);
                    _a = action;
                    switch (_a) {
                        case 'all': return [3 /*break*/, 1];
                        case 'insert': return [3 /*break*/, 3];
                        case 'update': return [3 /*break*/, 5];
                        case 'delete': return [3 /*break*/, 7];
                        case 'single': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, getAll()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 3: return [4 /*yield*/, insert(params)];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 5: return [4 /*yield*/, update(params)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 7: return [4 /*yield*/, deleteItem(params.id)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 9: return [4 /*yield*/, getSingle(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 11:
                    res.status(404);
                    return [3 /*break*/, 12];
                case 12:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.locations_endpoint = locations_endpoint;
