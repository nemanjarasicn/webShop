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
exports.blogs_endpoint = void 0;
var mysql_1 = require("./db/mysql");
var blog_enum_1 = require("./enums/blog-enum");
var _TB_NAME_ = "blog";
var _TB_NAME_BLOG_MEDIA = "blog_media";
var _TB_NAME_MEDIA = "media";
var getImageForBlog = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, tmpImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT m.??, m.??, m.?? FROM ?? m INNER JOIN ?? bm ON bm.?? = m.?? WHERE bm.?? = ?";
                queryParams = [
                    'id',
                    'src_name',
                    'alt_text',
                    _TB_NAME_MEDIA,
                    _TB_NAME_BLOG_MEDIA,
                    'media_id',
                    'id',
                    'blog_id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, single: true })];
            case 1:
                tmpImage = _a.sent();
                return [2 /*return*/, {
                        id: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.id,
                        src_name: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.src_name,
                        alt_text: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.alt_text
                    }];
        }
    });
}); };
var getAll = function (custom) { return __awaiter(void 0, void 0, void 0, function () {
    var completeResponse, sql, params, tmp, i, _i, tmp_1, row, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "SELECT DISTINCT b.??, b.??, b.??, b.??, DATE_FORMAT(b.??, \"%d/%m/%Y\") AS ?? FROM ?? b";
                params = [
                    'id',
                    'title',
                    'short_desc',
                    'content',
                    'published_date',
                    'published_date',
                    _TB_NAME_
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: (custom === null || custom === void 0 ? void 0 : custom.sql) || sql, params: (custom === null || custom === void 0 ? void 0 : custom.params) || params })];
            case 1:
                completeResponse = _b.sent();
                if (!((completeResponse === null || completeResponse === void 0 ? void 0 : completeResponse.length) > 0)) return [3 /*break*/, 5];
                tmp = completeResponse;
                i = 0;
                _i = 0, tmp_1 = tmp;
                _b.label = 2;
            case 2:
                if (!(_i < tmp_1.length)) return [3 /*break*/, 5];
                row = tmp_1[_i];
                _a = completeResponse[i++];
                return [4 /*yield*/, getImageForBlog(row.id)];
            case 3:
                _a.image = _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, completeResponse];
        }
    });
}); };
var getSingle = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params, completeResponse, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sql = "SELECT b.??, b.??, b.??, b.??, DATE_FORMAT(b.??, \"%d/%m/%Y\") AS ?? FROM ?? b\n    WHERE b.?? = ?";
                params = [
                    'id',
                    'title',
                    'short_desc',
                    'content',
                    'published_date',
                    'published_date',
                    _TB_NAME_,
                    'id',
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params, single: true })];
            case 1:
                completeResponse = _c.sent();
                _a = completeResponse;
                _b = 'image';
                return [4 /*yield*/, getImageForBlog(id)];
            case 2:
                _a[_b] = _c.sent();
                return [2 /*return*/, completeResponse];
        }
    });
}); };
var deleteItem = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ?";
                params = [_TB_NAME_BLOG_MEDIA, 'blog_id', id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                params = [_TB_NAME_, 'id', id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var update = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "UPDATE ??  SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
                queryParams = [_TB_NAME_, "title", params.title, "short_desc", params.short_desc, "content", params.content, "id", params.id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _b.sent();
                if (((_a = params === null || params === void 0 ? void 0 : params.image) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
                    queryParams = [_TB_NAME_BLOG_MEDIA, 'media_id', 'blog_id', params.image[0].id.toString(), params.id];
                }
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var insert = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, qParams, lastID;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "INSERT INTO ?? (??, ??, ??) VALUES ( ?, ?, ?)";
                qParams = [_TB_NAME_, 'title', 'short_desc', 'content', params.title, params.short_desc, params.content];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: qParams, lastInsertId: true })];
            case 1:
                lastID = _b.sent();
                if (((_a = params === null || params === void 0 ? void 0 : params.image) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
                    qParams = [_TB_NAME_BLOG_MEDIA, 'media_id', 'blog_id', params.image[0].id.toString(), lastID.toString()];
                }
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: qParams, lastInsertId: true })];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var deleteMainImage = function (id, media_id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?";
                params = [_TB_NAME_BLOG_MEDIA, 'media_id', media_id, 'blog_id', id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var customGetAll = function (type, param) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                switch (type) {
                    case blog_enum_1.BlogCustomGet.LATEST:
                        sql = "SELECT DISTINCT m.?? as ??, m.?? as ??, b.??, b.??, b.??, b.??, \n        DATE_FORMAT(b.??, \"%d\") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ?? FROM ?? b\n        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.?? ORDER BY b.?? DESC LIMIT ?";
                        params = [
                            'src_name',
                            'main_img_src',
                            'alt_text',
                            'main_img_alt_text',
                            'id',
                            'title',
                            'short_desc',
                            'content',
                            'published_date',
                            'published_date_day',
                            'published_date',
                            'published_date_month_txt',
                            _TB_NAME_,
                            _TB_NAME_BLOG_MEDIA,
                            'blog_id',
                            'id',
                            _TB_NAME_MEDIA,
                            'id',
                            'media_id',
                            'published_date',
                            8
                        ];
                        break;
                    case blog_enum_1.BlogCustomGet.LIST:
                        sql = "SELECT DISTINCT m.??, m.??, b.??, b.??, b.??, \n        DATE_FORMAT(b.??, \"%d\") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ??, DATE_FORMAT(b.??, \"%Y\") AS ?? \n        FROM ?? b\n        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.?? ORDER BY b.?? DESC LIMIT ? OFFSET ?";
                        params = [
                            'src_name',
                            'alt_text',
                            'id',
                            'title',
                            'short_desc',
                            'published_date',
                            'published_date_day',
                            'published_date',
                            'published_date_month_txt',
                            'published_date',
                            'published_date_year',
                            _TB_NAME_,
                            _TB_NAME_BLOG_MEDIA,
                            'blog_id',
                            'id',
                            _TB_NAME_MEDIA,
                            'id',
                            'media_id',
                            'published_date',
                            param.limit,
                            (param === null || param === void 0 ? void 0 : param.offset) || 0
                        ];
                        break;
                    case blog_enum_1.BlogCustomGet.RECENT:
                        sql = "SELECT DISTINCT m.??, m.??, b.??, b.??, \n        DATE_FORMAT(b.??, \"%d\") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ??, DATE_FORMAT(b.??, \"%Y\") AS ?? \n        FROM ?? b\n        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.??\n        WHERE b.?? IN (?)\n        ORDER BY b.?? DESC";
                        params = [
                            'src_name',
                            'alt_text',
                            'id',
                            'title',
                            'published_date',
                            'published_date_day',
                            'published_date',
                            'published_date_month_txt',
                            'published_date',
                            'published_date_year',
                            _TB_NAME_,
                            _TB_NAME_BLOG_MEDIA,
                            'blog_id',
                            'id',
                            _TB_NAME_MEDIA,
                            'id',
                            'media_id',
                            'id',
                            (param === null || param === void 0 ? void 0 : param.ids) || null,
                            'published_date'
                        ];
                        break;
                }
                return [4 /*yield*/, getAll({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function blogs_endpoint(req, res) {
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
                        case 'update': return [3 /*break*/, 5];
                        case 'delete': return [3 /*break*/, 7];
                        case 'single': return [3 /*break*/, 9];
                        case 'deleteMainImage': return [3 /*break*/, 11];
                        case 'homeLatest': return [3 /*break*/, 13];
                        case 'blogsList': return [3 /*break*/, 15];
                        case 'recentBlogs': return [3 /*break*/, 17];
                    }
                    return [3 /*break*/, 19];
                case 1: return [4 /*yield*/, getAll()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 3: return [4 /*yield*/, insert(params)];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 5: return [4 /*yield*/, update(params)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 7: return [4 /*yield*/, deleteItem(params.id)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 9: return [4 /*yield*/, getSingle(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 11: return [4 /*yield*/, deleteMainImage(params.id, params.media_id)];
                case 12:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 13: return [4 /*yield*/, customGetAll(blog_enum_1.BlogCustomGet.LATEST)];
                case 14:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 15: return [4 /*yield*/, customGetAll(blog_enum_1.BlogCustomGet.LIST, params)];
                case 16:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 17: return [4 /*yield*/, customGetAll(blog_enum_1.BlogCustomGet.RECENT, params)];
                case 18:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 20];
                case 19:
                    res.status(404);
                    return [3 /*break*/, 20];
                case 20:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.blogs_endpoint = blogs_endpoint;
