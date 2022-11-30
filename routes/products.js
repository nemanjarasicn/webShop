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
exports.products_endpoint = exports.getSingleProduct = void 0;
var mysql_1 = require("./db/mysql");
var product_enum_1 = require("./enums/product-enum");
var productAddOn = require("./productAddOn");
var _TB_NAME_PRODUCTS = "product";
var _TB_NAME_PRODUCTS_MEDIA = "product_media";
var _TB_NAME_CATEGORY = "product_category";
var _TB_NAME_CATEGORY_MEDIA = "category_media";
var _TB_NAME_MEDIA = "media";
var _TB_NAME_DISCOUNT = "discount";
var _TB_NAME_ASSESSMENT = "product_assessment";
var _TB_NAME_ADD_ON_LIST = "product_add_on_list";
var _TB_NAME_PRODUCT_COMBINATION_ITEM = 'product_combination_item';
//categories
var getAllParentCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ?? as ??, ?? as ?? FROM ??" //+ " WHERE `parent_cat` IS NULL"
                ;
                params = ["id", "value", "name", "label", _TB_NAME_CATEGORY];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getAllCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var completeResponse, sql, queryParams, tmp, i, _i, tmp_1, row, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "SELECT c.??, c.??, c.??, c2.?? as ?? FROM ?? c LEFT JOIN ?? c2 ON c2.?? = c.??";
                queryParams = [
                    'id',
                    'name',
                    'featured',
                    'name',
                    'parent_cat',
                    _TB_NAME_CATEGORY,
                    _TB_NAME_CATEGORY,
                    'id',
                    'parent_cat',
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
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
                return [4 /*yield*/, getImageForCategory(row.id)];
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
var getImageForCategory = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, tmpImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT m.??, m.??, m.?? FROM ?? m INNER JOIN ?? cm ON cm.?? = m.?? WHERE cm.?? = ? AND cm.?? = ?";
                queryParams = [
                    'id',
                    'src_name',
                    'alt_text',
                    _TB_NAME_MEDIA,
                    _TB_NAME_CATEGORY_MEDIA,
                    'media_id',
                    'id',
                    'category_id',
                    id,
                    'main',
                    1
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
var getAllCategoriesMenu = function () { return __awaiter(void 0, void 0, void 0, function () {
    var completeResponse, sql, queryParams, tmp, i, _i, tmp_2, row, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "SELECT c.??, c.?? AS ??, (c.?? IS NOT NULL) AS ??, c.?? FROM ??  c ORDER BY c.??, c.?? DESC";
                queryParams = [
                    'id',
                    'name',
                    'label',
                    'parent_cat',
                    'parent',
                    'featured',
                    _TB_NAME_CATEGORY,
                    'parent_cat',
                    'featured'
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                completeResponse = _b.sent();
                if (!((completeResponse === null || completeResponse === void 0 ? void 0 : completeResponse.length) > 0)) return [3 /*break*/, 5];
                tmp = completeResponse;
                i = 0;
                _i = 0, tmp_2 = tmp;
                _b.label = 2;
            case 2:
                if (!(_i < tmp_2.length)) return [3 /*break*/, 5];
                row = tmp_2[_i];
                _a = completeResponse[i++];
                return [4 /*yield*/, getImageForCategory(row.id)];
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
var getAllParentCategoriesView = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ??, ?? as ?? FROM ?? WHERE ?? IS NULL ORDER BY ?? DESC";
                params = ["id", "name", "label", _TB_NAME_CATEGORY, "parent_cat", "featured"];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getCategoriesWithImg = function () { return __awaiter(void 0, void 0, void 0, function () {
    var completeResponse, sql, tmp, i, _i, tmp_3, row, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "SELECT `c`.`id`, `c`.`name` as `label` FROM " + _TB_NAME_CATEGORY + "  `c` " +
                    " INNER JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
                    " INNER JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
                    " WHERE `m`.`src_name` IS NOT NULL ORDER BY `c`.`parent_cat`, `c`.`featured` DESC LIMIT 12";
                return [4 /*yield*/, mysql_1.execute({ sql: sql })];
            case 1:
                completeResponse = _b.sent();
                if (!((completeResponse === null || completeResponse === void 0 ? void 0 : completeResponse.length) > 0)) return [3 /*break*/, 5];
                tmp = completeResponse;
                i = 0;
                _i = 0, tmp_3 = tmp;
                _b.label = 2;
            case 2:
                if (!(_i < tmp_3.length)) return [3 /*break*/, 5];
                row = tmp_3[_i];
                _a = completeResponse[i++];
                return [4 /*yield*/, getImageForCategory(row.id)];
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
var getSingleCategory = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params, completeResponse, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                sql = "SELECT c.??, c.??, c.?? FROM ??  c WHERE c.?? = ?";
                params = ['name', 'featured', 'parent_cat', _TB_NAME_CATEGORY, 'id', id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params, single: true })];
            case 1:
                completeResponse = _c.sent();
                _a = completeResponse;
                _b = 'image';
                return [4 /*yield*/, getImageForCategory(id)];
            case 2:
                _a[_b] = _c.sent();
                return [2 /*return*/, completeResponse];
        }
    });
}); };
var deleteCategory = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ? ";
                params = [_TB_NAME_CATEGORY_MEDIA, "category_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                sql = "UPDATE ?? SET ?? = NULL WHERE ?? = ? ";
                params = [_TB_NAME_CATEGORY, "parent_cat", "id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                _a.sent();
                sql = "UPDATE ??  SET ?? = NULL WHERE ?? = ? ";
                params = [_TB_NAME_PRODUCTS, "product_category_id", "product_category_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 3:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ? ";
                params = [_TB_NAME_CATEGORY, "id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 4:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var deleteCategoryMedia = function (cat_id, media_id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?";
                params = [_TB_NAME_CATEGORY_MEDIA, "category_id", "media_id", cat_id, media_id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var updateCategoryMedia = function (cat_id, image) { return __awaiter(void 0, void 0, void 0, function () {
    var i, _i, image_1, img, sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (image === null || (image === null || image === void 0 ? void 0 : image.length) < 1)
                    return [2 /*return*/, true];
                i = 0;
                _i = 0, image_1 = image;
                _a.label = 1;
            case 1:
                if (!(_i < image_1.length)) return [3 /*break*/, 4];
                img = image_1[_i];
                sql = "INSERT INTO ?? (??, ??";
                params = [_TB_NAME_CATEGORY_MEDIA, "category_id", "media_id", cat_id, img.id];
                if (i === 0) {
                    sql += ", `main`) VALUES (?, ?, ?)";
                    params.push(1);
                }
                else
                    sql += ") VALUES (?, ?)";
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                _a.sent();
                i++;
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var updateCategory = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE ??  SET ?? = ?, ?? = ? , ?? = ? WHERE ?? = ?";
                queryParams = [_TB_NAME_CATEGORY, "name", params.name, "featured", params.featured === true ? 1 : 0, "parent_cat", params.parent_cat ? params.parent_cat : null, "id", params.id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                return [4 /*yield*/, updateCategoryMedia(params.id, params.image)];
            case 2: return [2 /*return*/, (_a.sent()) !== false];
        }
    });
}); };
var insertCategory = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "INSERT INTO ?? (??, ??, ??) VALUES ( ?, ?, ? )";
                queryParams = [_TB_NAME_CATEGORY, "name", "featured", "parent_cat", params.name, params.featured === true ? 1 : 0, params.parent_cat ? params.parent_cat : null];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, lastInsertId: true })
                    //insert media
                ];
            case 1:
                result = _b.sent();
                if (!((result !== null || true) && ((_a = params.image) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, updateCategoryMedia(+result, params.image)];
            case 2:
                if ((_b.sent()) === false)
                    return [2 /*return*/, false];
                _b.label = 3;
            case 3: return [2 /*return*/, true];
        }
    });
}); };
//discounts
var getAllDiscounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ??, ??, ??, DATE_FORMAT(??, \"%d/%m/%Y\") as start_at, DATE_FORMAT(??, \"%d/%m/%Y\") as end_at, ??, ?? FROM ??";
                params = [
                    'id',
                    'name',
                    'percentage_value',
                    'start_at',
                    'end_at',
                    'promo_code',
                    'description',
                    _TB_NAME_DISCOUNT
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getSingleDiscount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ??, ??, ??,  DATE_FORMAT(??, \"%Y-%m-%d\") as start_at, DATE_FORMAT(??, \"%Y-%m-%d\") as end_at,  ??, ?? FROM ?? WHERE ?? = ?";
                params = [
                    'id',
                    'name',
                    'percentage_value',
                    'start_at',
                    'end_at',
                    'promo_code',
                    'description',
                    _TB_NAME_DISCOUNT,
                    "id",
                    id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params, single: true })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var deleteDiscount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE ?? SET ?? = NULL WHERE ?? = ?";
                params = [_TB_NAME_PRODUCTS, "discount_id", "discount_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                sql = "DELETE FROM ?? WHERE ?? = ? ";
                params = [_TB_NAME_DISCOUNT, "id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var updateDiscount = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ?, `description` = ? WHERE `id` = ?";
                queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.description, params.id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var insertDiscount = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`, `description`) VALUES ( ?, ?, ?, ?, ?, ? )";
                queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code, params.description];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var getAllActiveDiscounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT `id`, `name`, `percentage_value`, DATE_FORMAT(`start_at`, \"%d %m %Y\") AS `start_at`, DATE_FORMAT(`end_at`, \"%d %m %Y\") AS `end_at`, `promo_code`, `description` FROM " +
                    _TB_NAME_DISCOUNT + " WHERE (`start_at` IS NULL AND `end_at` IS NULL) OR (NOW() BETWEEN `start_at` AND `end_at`) AND `promo_code` IS NOT NULL ";
                return [4 /*yield*/, mysql_1.execute({ sql: sql })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//products
var getAllProducts = function (custom) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, completeResponse, tmp, i, _i, tmp_4, row, _a, tmpImage, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                sql = 'SELECT `p`.`id`, `p`.`name`, `c`.`name` as `category`, CONCAT( `p`.`price`, " rsd.") as price, ' +
                    ' CONCAT( IFNULL(`d`.`name`, "Nema popusta"), "( ", IFNULL(`d`.`percentage_value`, " "), " % )" ) as `discount`, ' +
                    " ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price`, `p`.`active` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                    " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` ON `c`.`id` = `p`.`product_category_id`" +
                    " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` ";
                queryParams = [];
                return [4 /*yield*/, mysql_1.execute({
                        sql: (custom === null || custom === void 0 ? void 0 : custom.customSql) || sql,
                        params: (custom === null || custom === void 0 ? void 0 : custom.customParams) || queryParams
                    })];
            case 1:
                completeResponse = _d.sent();
                if (!((completeResponse === null || completeResponse === void 0 ? void 0 : completeResponse.length) > 0)) return [3 /*break*/, 8];
                tmp = completeResponse;
                i = 0;
                _i = 0, tmp_4 = tmp;
                _d.label = 2;
            case 2:
                if (!(_i < tmp_4.length)) return [3 /*break*/, 8];
                row = tmp_4[_i];
                //set assessment
                _a = completeResponse[i];
                return [4 /*yield*/, getAssessmentForProduct(row['id'])
                    // take main_image
                ];
            case 3:
                //set assessment
                _a.assesssment = _d.sent();
                // take main_image
                sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                    " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                    " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?";
                queryParams = [row['id'], 1];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, single: true })];
            case 4:
                tmpImage = _d.sent();
                completeResponse[i].image = {
                    id: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.id,
                    src_name: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.src_name,
                    alt_text: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.alt_text
                };
                //set gallery
                sql = "SELECT `m`.`src_name` FROM " + _TB_NAME_MEDIA + " `m` " +
                    " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                    " WHERE `pm`.`product_id` = ? ORDER BY `pm`.`main` DESC";
                queryParams = [row['id']];
                _b = completeResponse[i];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })
                    // take options
                ];
            case 5:
                _b.gallery = _d.sent();
                // take options
                _c = completeResponse[i];
                return [4 /*yield*/, productAddOn.getAll(row['id'])];
            case 6:
                // take options
                _c.options = _d.sent();
                i++;
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, completeResponse];
        }
    });
}); };
var getAllProductCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ?? as ??, ?? as ?? FROM ??";
                params = ["id", 'value', "name", 'label', _TB_NAME_CATEGORY];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getAllProductDiscounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ?? as ??, ?? as ?? FROM ??";
                params = ["id", 'value', "name", 'label', _TB_NAME_DISCOUNT];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getSingleProduct = function (id, custom) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params, completeResponse, tmpImage, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sql = "SELECT * FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ?";
                params = [id];
                return [4 /*yield*/, mysql_1.execute({ sql: (custom === null || custom === void 0 ? void 0 : custom.customSql) || sql, params: (custom === null || custom === void 0 ? void 0 : custom.customParams) || params, single: true })
                    // take main_image
                ];
            case 1:
                completeResponse = _e.sent();
                // take main_image
                sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                    " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                    " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?";
                params = [id, 1];
                if (!completeResponse) return [3 /*break*/, 5];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params, single: true })];
            case 2:
                tmpImage = _e.sent();
                completeResponse['image'] = {
                    id: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.id,
                    src_name: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.src_name,
                    alt_text: tmpImage === null || tmpImage === void 0 ? void 0 : tmpImage.alt_text
                };
                // take images (gallery)
                sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                    " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                    " WHERE `pm`.`product_id` = ? AND `pm`.`main` IS NULL";
                params = [id];
                _a = completeResponse;
                _b = 'gallery';
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })
                    // take options
                ];
            case 3:
                _a[_b] = _e.sent();
                // take options
                _c = completeResponse;
                _d = 'options';
                return [4 /*yield*/, productAddOn.getAll(completeResponse['id'])];
            case 4:
                // take options
                _c[_d] = _e.sent();
                _e.label = 5;
            case 5: return [2 /*return*/, completeResponse];
        }
    });
}); };
exports.getSingleProduct = getSingleProduct;
var deleteProduct = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ? ";
                params = [_TB_NAME_PRODUCTS_MEDIA, "product_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                params = [_TB_NAME_ASSESSMENT, "product_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 2:
                _a.sent();
                params = [_TB_NAME_ASSESSMENT, "product_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 3:
                _a.sent();
                params = [_TB_NAME_ADD_ON_LIST, "product_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 4:
                _a.sent();
                params = [_TB_NAME_PRODUCT_COMBINATION_ITEM, "product_id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 5:
                _a.sent();
                params = [_TB_NAME_PRODUCTS, "id", id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 6:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var deleteProductMedia = function (prod_id, media_id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?";
                params = [_TB_NAME_PRODUCTS_MEDIA, "product_id", prod_id, "media_id", media_id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
var updateProductMedia = function (prod_id, image) { return __awaiter(void 0, void 0, void 0, function () {
    var i, _i, image_2, img, sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (image === null || (image === null || image === void 0 ? void 0 : image.length) < 1)
                    return [2 /*return*/, true];
                i = 0;
                _i = 0, image_2 = image;
                _a.label = 1;
            case 1:
                if (!(_i < image_2.length)) return [3 /*break*/, 4];
                img = image_2[_i];
                sql = "INSERT INTO ?? (??, ??";
                queryParams = [_TB_NAME_PRODUCTS_MEDIA, "product_id", "media_id", prod_id, img.id];
                if (i === 0) {
                    sql += ", `main`) VALUES (?, ?, ?)";
                    queryParams.push(1);
                }
                else
                    sql += ") VALUES (?, ?)";
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 2:
                _a.sent();
                i++;
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var getAllProductsCustom = function (type, param) { return __awaiter(void 0, void 0, void 0, function () {
    var customSql, customParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                switch (type) {
                    case product_enum_1.ProductEnumSingleArr.BEST_ASSESSMENT:
                        customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                            "FROM " + _TB_NAME_PRODUCTS + " `p`" +
                            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                            " WHERE `p`.`active` = ? LIMIT ?";
                        customParams = [1, param.limit];
                        break;
                    case product_enum_1.ProductEnumSingleArr.CART_WISHLIST:
                        customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                            " WHERE `p`.`id` IN (?)";
                        customParams = [(param === null || param === void 0 ? void 0 : param.ids.length) < 1 ? null : param.ids];
                        break;
                    case product_enum_1.ProductEnumSingleArr.RELATED:
                        customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                            " WHERE `c`.`id` = ? AND `p`.`id` != ?";
                        customParams = [param.categoryId, param.productId];
                        break;
                }
                return [4 /*yield*/, getAllProducts({ customSql: customSql, customParams: customParams })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getSingleProductCustom = function (product_id, type) { return __awaiter(void 0, void 0, void 0, function () {
    var customSql, customParams, product, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                switch (type) {
                    case product_enum_1.ProductEnumSingle.BASIC:
                        customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, `p`.`description`, `c`.`name` as `category`, " +
                            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                            " WHERE `p`.`id` = ?";
                        customParams = [product_id];
                        break;
                    case product_enum_1.ProductEnumSingle.DETAIL:
                        customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                            " `c`.`name` as `product_category_name`, `p`.`product_category_id`, " +
                            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                            " WHERE `p`.`id` = ?";
                        customParams = [product_id];
                        break;
                }
                return [4 /*yield*/, exports.getSingleProduct(product_id, { customSql: customSql, customParams: customParams })];
            case 1:
                product = _b.sent();
                _a = product;
                return [4 /*yield*/, getAssessmentForProduct(product_id)];
            case 2:
                _a.assesssment = _b.sent();
                return [2 /*return*/, product];
        }
    });
}); };
var updateProduct = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "UPDATE " + _TB_NAME_PRODUCTS + "  SET `name` = ?, `featured` = ?, `active` = ?, `product_category_id` = ?, " +
                    " `price` = ?, `description` = ?, `discount_id` = ?, `unique_number` = ?, `delivery_matter` = ?, `barcode` = ? " +
                    " WHERE `id` = ?";
                queryParams = [
                    params.name,
                    params.featured === true ? 1 : 0,
                    params.active === true ? 1 : 0,
                    params.product_category_id ? params.product_category_id : null,
                    params.price,
                    params.description,
                    params.discount_id ? params.discount_id : null,
                    params.unique_number,
                    params.delivery_matter === true ? 1 : 0,
                    params.barcode,
                    params.id
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams })];
            case 1:
                _a.sent();
                return [4 /*yield*/, updateProductMedia(params.id, params.image)];
            case 2: return [2 /*return*/, (_a.sent()) !== false];
        }
    });
}); };
var insertProduct = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams, lastInsertId;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sql = "INSERT INTO ??  (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
                queryParams = [
                    _TB_NAME_PRODUCTS,
                    'name',
                    'featured',
                    'product_category_id',
                    'active',
                    'description',
                    'delivery_matter',
                    'barcode',
                    'unique_number',
                    'price',
                    'discount_id',
                    params.name,
                    params.featured === true ? 1 : 0,
                    params.product_category_id ? params.product_category_id : null,
                    params.active === true ? 1 : 0,
                    params.description,
                    params.delivery_matter === true ? 1 : 0,
                    params.barcode,
                    params.unique_number,
                    params.price,
                    (params === null || params === void 0 ? void 0 : params.discount_id) ? params.discount_id : null,
                ];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, lastInsertId: true })
                    //insert media
                ];
            case 1:
                lastInsertId = _b.sent();
                if (!((lastInsertId !== null || true) && ((_a = params.image) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, updateProductMedia(+lastInsertId, params.image)];
            case 2:
                if ((_b.sent()) === false)
                    return [2 /*return*/, false];
                _b.label = 3;
            case 3: return [2 /*return*/, true];
        }
    });
}); };
var getTogetherSingle_related = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var single, related;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSingleProductCustom(product_id, product_enum_1.ProductEnumSingle.DETAIL)];
            case 1:
                single = _a.sent();
                return [4 /*yield*/, getAllProductsCustom(product_enum_1.ProductEnumSingleArr.RELATED, { categoryId: (single === null || single === void 0 ? void 0 : single.product_category_id) || 0, productId: single.id })];
            case 2:
                related = _a.sent();
                return [2 /*return*/, { single: single, related: related }];
        }
    });
}); };
//assessment
var getAssessmentForProduct = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT COUNT(`id`) as `num`, SUM(IFNULL(`assessment`, 0)) as `sum` FROM " + _TB_NAME_ASSESSMENT + " WHERE `product_id` = ?";
                params = [id];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: params })];
            case 1:
                data = _a.sent();
                if (data['num'] > 0)
                    return [2 /*return*/, { sum: data['sum'] / data['num'], num: data['num'] }]; // TODO rename sum to avg
                return [2 /*return*/, 'Nema ocene'];
        }
    });
}); };
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
                        case 'delete_cat_media': return [3 /*break*/, 13];
                        case 'all_parent_categories_view': return [3 /*break*/, 15];
                        case 'all_categories_menu': return [3 /*break*/, 17];
                        case 'all_categories_with_img': return [3 /*break*/, 19];
                        case 'all_discounts': return [3 /*break*/, 21];
                        case 'insert_discount': return [3 /*break*/, 23];
                        case 'update_discount': return [3 /*break*/, 25];
                        case 'delete_discount': return [3 /*break*/, 27];
                        case 'single_discount': return [3 /*break*/, 29];
                        case 'get_all_active_discounts': return [3 /*break*/, 31];
                        case 'all_products': return [3 /*break*/, 33];
                        case 'all_product_discounts': return [3 /*break*/, 35];
                        case 'all_product_categories': return [3 /*break*/, 37];
                        case 'insert_product': return [3 /*break*/, 39];
                        case 'update_product': return [3 /*break*/, 41];
                        case 'delete_product': return [3 /*break*/, 43];
                        case 'single_product': return [3 /*break*/, 45];
                        case 'delete_prod_media': return [3 /*break*/, 47];
                        case 'get_all_products_custom': return [3 /*break*/, 49];
                        case 'get_single_product_custom': return [3 /*break*/, 51];
                        case 'get_together_single_related': return [3 /*break*/, 53];
                    }
                    return [3 /*break*/, 55];
                case 1: return [4 /*yield*/, getAllParentCategories()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 3: return [4 /*yield*/, getAllCategories()];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 5: return [4 /*yield*/, insertCategory(params)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 7: return [4 /*yield*/, updateCategory(params)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 9: return [4 /*yield*/, deleteCategory(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 11: return [4 /*yield*/, getSingleCategory(params.id)];
                case 12:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 13: return [4 /*yield*/, deleteCategoryMedia(params.cat_id, params.media_id)];
                case 14:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 15: return [4 /*yield*/, getAllParentCategoriesView()];
                case 16:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 17: return [4 /*yield*/, getAllCategoriesMenu()];
                case 18:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 19: return [4 /*yield*/, getCategoriesWithImg()];
                case 20:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 21: return [4 /*yield*/, getAllDiscounts()];
                case 22:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 23: return [4 /*yield*/, insertDiscount(params)];
                case 24:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 25: return [4 /*yield*/, updateDiscount(params)];
                case 26:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 27: return [4 /*yield*/, deleteDiscount(params.id)];
                case 28:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 29: return [4 /*yield*/, getSingleDiscount(params.id)];
                case 30:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 31: return [4 /*yield*/, getAllActiveDiscounts()];
                case 32:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 33: return [4 /*yield*/, getAllProducts()];
                case 34:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 35: return [4 /*yield*/, getAllProductDiscounts()];
                case 36:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 37: return [4 /*yield*/, getAllProductCategories()];
                case 38:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 39: return [4 /*yield*/, insertProduct(params)];
                case 40:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 41: return [4 /*yield*/, updateProduct(params)];
                case 42:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 43: return [4 /*yield*/, deleteProduct(params.id)];
                case 44:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 45: return [4 /*yield*/, exports.getSingleProduct(params.id)];
                case 46:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 47: return [4 /*yield*/, deleteProductMedia(params.prod_id, params.media_id)];
                case 48:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 49: return [4 /*yield*/, getAllProductsCustom(params.type, params)];
                case 50:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 51: return [4 /*yield*/, getSingleProductCustom(params.id, params.type)];
                case 52:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 53: return [4 /*yield*/, getTogetherSingle_related(params.id)];
                case 54:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 56];
                case 55:
                    res.status(404);
                    return [3 /*break*/, 56];
                case 56:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.products_endpoint = products_endpoint;
