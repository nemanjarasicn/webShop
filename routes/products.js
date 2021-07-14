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
exports.products_endpoint = void 0;
//@ts-ignore
var pool = require('./db/mysql');
var _TB_NAME_PRODUCTS = "`product`";
var _TB_NAME_CATEGORY = "`product_category`";
var _TB_NAME_CATEGORY_MEDIA = "`category_media`";
var _TB_NAME_MEDIA = "`media`";
var _TB_NAME_DISCOUNT = "`discount`";
//categories
var getAllParentCategories = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id`, `name` FROM " + _TB_NAME_CATEGORY + " WHERE `parent_cat` IS NULL";
        pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getAllCategories = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `c`.`id`, `c`.`name`, `c`.`featured`, `c2`.`name` as `parent_cat`, `m`.`src_name` as `image` FROM " + _TB_NAME_CATEGORY + "  `c` " +
            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c2` on `c2`.`id` = `c`.`parent_cat` " +
            " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
            " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`";
        pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingleCategory = function (id) {
    return new Promise(function (res, rej) {
        var sql = "SELECT `c`.`name`, `c`.`featured`, `c`.`parent_cat`, `m`.`src_name` as `image` FROM " + _TB_NAME_CATEGORY + "  `c` " +
            " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
            " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id` " +
            " WHERE `c`.`id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results[0] || null)));
        });
    });
};
var deleteCategory = function (id) {
    return new Promise(function (res, rej) {
        var sql = "DELETE FROM " + _TB_NAME_CATEGORY + " WHERE `id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var updateCategory = function (params) {
    return new Promise(function (res, rej) {
        var sql = "UPDATE " + _TB_NAME_CATEGORY + "  SET `name` = ?, `featured` = ? , `parent_cat` = ? WHERE `id` = ?";
        var queryParams = [params.name, params.featured === true ? 1 : 0, params.parent_cat, params.id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var insertCategory = function (params) {
    return new Promise(function (res, rej) {
        var sql = "INSERT INTO " + _TB_NAME_CATEGORY + " (`name`, `featured`, `parent_cat`) VALUES ( ?, ?, ? )";
        var queryParams = [params.name, params.featured === true ? 1 : 0, params.parent_cat];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
//discounts
var getAllDiscounts = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_DISCOUNT;
        pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingleDiscount = function (id) {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_DISCOUNT +
            " WHERE `id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(results[0] || null)));
        });
    });
};
var deleteDiscount = function (id) {
    return new Promise(function (res, rej) {
        var sql = "DELETE FROM " + _TB_NAME_DISCOUNT + " WHERE `id` = ? ";
        var queryParams = [id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var updateDiscount = function (params) {
    return new Promise(function (res, rej) {
        var sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ? WHERE `id` = ?";
        var queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.id];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
var insertDiscount = function (params) {
    return new Promise(function (res, rej) {
        var sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`) VALUES ( ?, ?, ?, ?, ? )";
        var queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code];
        pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            res(JSON.parse(JSON.stringify(true)));
        });
    });
};
function products_endpoint(req, res) {
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
                        case 'all_parent_categories': return [3 /*break*/, 1];
                        case 'all_categories': return [3 /*break*/, 3];
                        case 'insert_category': return [3 /*break*/, 5];
                        case 'update_category': return [3 /*break*/, 7];
                        case 'delete_category': return [3 /*break*/, 9];
                        case 'single_category': return [3 /*break*/, 11];
                        case 'all_discounts': return [3 /*break*/, 13];
                        case 'insert_discount': return [3 /*break*/, 15];
                        case 'update_discount': return [3 /*break*/, 17];
                        case 'delete_discount': return [3 /*break*/, 19];
                        case 'single_discount': return [3 /*break*/, 21];
                    }
                    return [3 /*break*/, 23];
                case 1: return [4 /*yield*/, getAllParentCategories()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 3: return [4 /*yield*/, getAllCategories()];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 5: return [4 /*yield*/, insertCategory(params)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 7: return [4 /*yield*/, updateCategory(params)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 9: return [4 /*yield*/, deleteCategory(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 11: return [4 /*yield*/, getSingleCategory(params.id)];
                case 12:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 13: return [4 /*yield*/, getAllDiscounts()];
                case 14:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 15: return [4 /*yield*/, insertDiscount(params)];
                case 16:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 17: return [4 /*yield*/, updateDiscount(params)];
                case 18:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 19: return [4 /*yield*/, deleteDiscount(params.id)];
                case 20:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 21: return [4 /*yield*/, getSingleDiscount(params.id)];
                case 22:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 24];
                case 23:
                    res.status(404);
                    return [3 /*break*/, 24];
                case 24:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.products_endpoint = products_endpoint;
