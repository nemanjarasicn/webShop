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
exports.medias_endpoint = void 0;
var mysql_1 = require("./db/mysql");
var _TB_NAME_ = "media";
var _TB_NAME_TYPE_ = "media_type";
var _TB_CATEGORY_MEDIA_ = "category_media";
var _TB_PRODUCT_MEDIA_ = "product_media";
var _TB_MEDIA_COMBINATION = 'product_combination_media';
var _TB_NAME_BLOG_MEDIA = "blog_media";
var getAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT `m`.??, `m`.??, `m`.??, `m`.?? as ??, `m`.??, `mt`.?? as ?? FROM ?? `m` " +
                    "INNER JOIN ?? `mt` on `mt`.?? = `m`.??";
                params = ["id", "name", "src_name", "src_name", "image", "alt_text", "name", "type_name", _TB_NAME_, _TB_NAME_TYPE_, "id", "type_id"];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var deleteItem = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM " + _TB_CATEGORY_MEDIA_ + " WHERE `media_id` = ?";
                queryParams = [id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ?";
                queryParams = [_TB_PRODUCT_MEDIA_, "media_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 2:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ?";
                queryParams = [_TB_NAME_BLOG_MEDIA, "media_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 3:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ?";
                queryParams = [_TB_MEDIA_COMBINATION, "media_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 4:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ?";
                queryParams = [_TB_NAME_, "id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 5:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var insert = function (params, file) { return __awaiter(void 0, void 0, void 0, function () {
    var src_name, sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                src_name = "assets/media/" + file.filename;
                sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ? )";
                queryParams = [_TB_NAME_, "name", "type_id", "src_name", "alt_text", params.name, +params.type_id, src_name, params.alt_text];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getTypes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ?? as ??, ?? as ?? FROM ??";
                params = ["id", "value", "name", "label", _TB_NAME_TYPE_];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getPickAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ??, ??, ?? ,?? FROM ?? WHERE ?? = ?";
                params = ["id", "name", "src_name", "alt_text", _TB_NAME_, "type_id", 1];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function medias_endpoint(req, res) {
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
                        case 'all': return [3 /*break*/, 1];
                        case 'insert': return [3 /*break*/, 3];
                        case 'delete': return [3 /*break*/, 5];
                        case 'getTypes': return [3 /*break*/, 7];
                        case 'pickAll': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, getAll()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 3: return [4 /*yield*/, insert(params, req.file)];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 5: return [4 /*yield*/, deleteItem(params.id)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 7: return [4 /*yield*/, getTypes()];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 12];
                case 9: return [4 /*yield*/, getPickAll()];
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
exports.medias_endpoint = medias_endpoint;
