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
exports.product_combinations = void 0;
var mysql_1 = require("./db/mysql");
var products_1 = require("./products");
var _TB_NAME_COMBINATION = 'product_combination';
var _TB_NAME_COMBINATION_ITEM = 'product_combination_item';
var _TB_NAME_MEDIA_COMBINATION = 'product_combination_media';
var _TB_NAME_MEDIA = 'media';
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT DISTINCT c.??, m.?? as ??, c.??, CONCAT(c.??, ' rsd.') as ??, c.??, c.?? FROM ?? c \n    LEFT JOIN ?? cm ON cm.?? = c.??\n    LEFT JOIN ?? m on m.?? = cm.??";
                params = [
                    'id',
                    'src_name',
                    'image',
                    'name',
                    'price',
                    'price',
                    'active',
                    'description',
                    _TB_NAME_COMBINATION,
                    _TB_NAME_MEDIA_COMBINATION,
                    'product_combination_id',
                    'id',
                    _TB_NAME_MEDIA,
                    'id',
                    'media_id'
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var deleteCombination = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ?";
                params = [
                    _TB_NAME_COMBINATION_ITEM,
                    'product_combination_id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                params = [
                    _TB_NAME_MEDIA_COMBINATION,
                    'product_combination_id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                _a.sent();
                params = [
                    _TB_NAME_COMBINATION,
                    'id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 3:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var insert = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, productCombinationId, _i, _a, item;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)";
                queryParams = [
                    _TB_NAME_COMBINATION,
                    'name',
                    'price',
                    'active',
                    'description',
                    params.productCombination.name,
                    params.productCombination.price,
                    params.productCombination.active,
                    params.productCombination.description
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, lastInsertId: true })];
            case 1:
                productCombinationId = _b.sent();
                if (!(params === null || params === void 0 ? void 0 : params.media_id)) return [3 /*break*/, 3];
                sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
                queryParams = [
                    _TB_NAME_MEDIA_COMBINATION,
                    'media_id',
                    'product_combination_id',
                    params.media_id,
                    productCombinationId
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i = 0, _a = params.items;
                _b.label = 4;
            case 4:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                item = _a[_i];
                return [4 /*yield*/, insertItem(item, productCombinationId)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/, true];
        }
    });
}); };
var update = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, _i, _a, item;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                queryParams = [
                    _TB_NAME_COMBINATION,
                    'name',
                    params.productCombination.name,
                    'price',
                    params.productCombination.price,
                    'description',
                    params.productCombination.description,
                    'active',
                    params.productCombination.active,
                    'id',
                    params.productCombination.id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _c.sent();
                if (!(((_b = params === null || params === void 0 ? void 0 : params.items) === null || _b === void 0 ? void 0 : _b.length) > 0)) return [3 /*break*/, 5];
                _i = 0, _a = params.items;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                item = _a[_i];
                return [4 /*yield*/, insertItem(item, params.productCombination.id)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
                queryParams = [
                    _TB_NAME_MEDIA_COMBINATION,
                    'product_combination_id',
                    'media_id',
                    params.productCombination.id,
                    params.media_id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 6:
                _c.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var insertItem = function (item, productCombinationId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
                queryParams = [
                    _TB_NAME_COMBINATION_ITEM,
                    'product_id',
                    'product_combination_id',
                    'count',
                    item.product_id,
                    productCombinationId,
                    item.count
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getSingle = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params, productCombination, itemsTmp, items, _i, itemsTmp_1, item, tmpProductSingle;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT c.??,  m.?? as ??, m.?? as ??, m.?? as ??, c.??, c.??, c.??, c.?? FROM ?? c \n    LEFT JOIN ?? cm ON cm.?? = c.??\n    LEFT JOIN ?? m on m.?? = cm.?? WHERE c.?? = ?";
                params = [
                    'id',
                    'src_name',
                    'image',
                    'alt_text',
                    'image_alt_text',
                    'id',
                    'media_id',
                    'name',
                    'price',
                    'active',
                    'description',
                    _TB_NAME_COMBINATION,
                    _TB_NAME_MEDIA_COMBINATION,
                    'product_combination_id',
                    'id',
                    _TB_NAME_MEDIA,
                    'id',
                    'media_id',
                    'id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params, single: true })];
            case 1:
                productCombination = _a.sent();
                sql = "SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?";
                params = [
                    'id',
                    'product_combination_id',
                    'product_id',
                    'count',
                    _TB_NAME_COMBINATION_ITEM,
                    'product_combination_id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                itemsTmp = _a.sent();
                items = [];
                _i = 0, itemsTmp_1 = itemsTmp;
                _a.label = 3;
            case 3:
                if (!(_i < itemsTmp_1.length)) return [3 /*break*/, 6];
                item = itemsTmp_1[_i];
                return [4 /*yield*/, products_1.getSingleProduct(item.product_id)];
            case 4:
                tmpProductSingle = _a.sent();
                items.push({ product: tmpProductSingle, count: item.count, id: item.id, product_combination_id: item.product_combination_id });
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, { productCombination: productCombination, items: items, media: { id: productCombination.media_id, alt_text: productCombination.image_alt_text, src_name: productCombination.image } }];
        }
    });
}); };
var deleteItem = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ?";
                params = [
                    _TB_NAME_COMBINATION_ITEM,
                    'id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var deleteMedia = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ?";
                params = [
                    _TB_NAME_MEDIA_COMBINATION,
                    'media_id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
function product_combinations(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var action, params, returnValue, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    action = req.params.action;
                    params = req.body;
                    returnValue = undefined;
                    _a = action;
                    switch (_a) {
                        case 'getAll': return [3 /*break*/, 1];
                        case 'getSingle': return [3 /*break*/, 3];
                        case 'delete': return [3 /*break*/, 5];
                        case 'deleteItem': return [3 /*break*/, 7];
                        case 'deleteImage': return [3 /*break*/, 9];
                        case 'update': return [3 /*break*/, 11];
                        case 'insert': return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 1: return [4 /*yield*/, getAll()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 3: return [4 /*yield*/, getSingle(params.id)];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 5: return [4 /*yield*/, deleteCombination(params.id)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 7: return [4 /*yield*/, deleteItem(params.id)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 9: return [4 /*yield*/, deleteMedia(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 11: return [4 /*yield*/, update(params)];
                case 12:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 13: return [4 /*yield*/, insert(params)];
                case 14:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 16];
                case 15:
                    res.status(404);
                    return [3 /*break*/, 16];
                case 16:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.product_combinations = product_combinations;
