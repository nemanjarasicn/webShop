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
var mysql_1 = require("./db/mysql");
var _TB_NAME_PRODUCTS = "`product`";
var _TB_NAME_PRODUCTS_MEDIA = "`product_media`";
var _TB_NAME_CATEGORY = "`product_category`";
var _TB_NAME_CATEGORY_MEDIA = "`category_media`";
var _TB_NAME_MEDIA = "`media`";
var _TB_NAME_DISCOUNT = "`discount`";
var _TB_NAME_ASESSMENT = "`product_assessment`";
//categories
var getAllParentCategories = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id` as `value`, `name` as `label` FROM " + _TB_NAME_CATEGORY; //+ " WHERE `parent_cat` IS NULL" 
        mysql_1.pool.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                return rej(false);
            }
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
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getAllCategoriesMenu = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `c`.`id`, `c`.`name` as `label`, (`c`.`parent_cat` IS NOT NULL) AS parent, `c`.`featured`, `m`.`src_name` as `img_src`, `m`.`alt_text` " +
            " FROM " + _TB_NAME_CATEGORY + "  `c` " +
            " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
            " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
            " ORDER BY `c`.`parent_cat`, `c`.`featured` DESC";
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getAllParentCategoriesView = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id`, `name` as `label` FROM " + _TB_NAME_CATEGORY + " WHERE `parent_cat` IS NULL ORDER BY `featured` DESC";
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getCategoriesWithImg = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `c`.`id`, `c`.`name` as `label`, `m`.`src_name` as `img_src`, `m`.`alt_text` FROM " + _TB_NAME_CATEGORY + "  `c` " +
            " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
            " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
            " WHERE `m`.`src_name` IS NOT NULL ORDER BY `c`.`parent_cat`, `c`.`featured` DESC LIMIT 12";
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingleCategory = function (id) {
    return new Promise(function (res, rej) {
        var completeResponse;
        new Promise(function (resIN, rejIN) {
            var sql = "SELECT `c`.`name`, `c`.`featured`, `c`.`parent_cat` FROM " + _TB_NAME_CATEGORY + "  `c`  WHERE `c`.`id` = ? ";
            var queryParams = [id];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    return rej(false);
                }
                completeResponse = JSON.parse(JSON.stringify(results[0] || null));
                resIN(true);
            });
        }).then(function (result) {
            var sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                " INNER JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`media_id` = `m`.`id` " +
                " WHERE `cm`.`category_id` = ? ";
            var queryParams = [id];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error)
                    return rej(false);
                completeResponse.image = results;
                res(completeResponse);
            });
        });
    });
};
var deleteCategory = function (id) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, queryParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM " + _TB_NAME_CATEGORY_MEDIA + " WHERE `category_id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    sql = "UPDATE " + _TB_NAME_CATEGORY + " SET `parent_cat` = NULL WHERE `id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 2:
                    _a.sent();
                    sql = "UPDATE " + _TB_NAME_PRODUCTS + " SET `product_category_id` = NULL WHERE `product_category_id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 3:
                    _a.sent();
                    sql = "DELETE FROM " + _TB_NAME_CATEGORY + " WHERE `id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 4:
                    _a.sent();
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var deleteCategoryMeida = function (cat_id, media_id) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, queryParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM " + _TB_NAME_CATEGORY_MEDIA + " WHERE `category_id` = ? AND `media_id` = ?";
                    queryParams = [cat_id, media_id];
                    return [4 /*yield*/, mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                            if (error)
                                return rej(false);
                            res(true);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
var updateCategoryMedia = function (cat_id, image) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var i, _loop_1, _i, image_1, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (image === null || (image === null || image === void 0 ? void 0 : image.length) < 1)
                        return [2 /*return*/, res(true)];
                    i = 0;
                    _loop_1 = function (img) {
                        var sql, queryParams;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    sql = "INSERT INTO " + _TB_NAME_CATEGORY_MEDIA + " (`category_id`, `media_id`";
                                    queryParams = [cat_id, img.id];
                                    if (i === 0) {
                                        sql += ", `main`) VALUES (?, ?, ?)";
                                        queryParams.push(1);
                                    }
                                    else
                                        sql += ") VALUES (?, ?)";
                                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                                if (error)
                                                    return rej(false);
                                                resIN(true);
                                            });
                                        })];
                                case 1:
                                    _b.sent();
                                    i++;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, image_1 = image;
                    _a.label = 1;
                case 1:
                    if (!(_i < image_1.length)) return [3 /*break*/, 4];
                    img = image_1[_i];
                    return [5 /*yield**/, _loop_1(img)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var updateCategory = function (params) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, queryParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "UPDATE " + _TB_NAME_CATEGORY + "  SET `name` = ?, `featured` = ? , `parent_cat` = ? WHERE `id` = ?";
                    queryParams = [params.name, params.featured === true ? 1 : 0, params.parent_cat ? params.parent_cat : null, params.id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error)
                                    return rej(false);
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateCategoryMedia(params.id, params.image)];
                case 2:
                    if ((_a.sent()) === false)
                        return [2 /*return*/, rej(false)];
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var insertCategory = function (params) {
    return new Promise(function (res, rej) {
        new Promise(function (resIN, rejIN) {
            var sql = "INSERT INTO " + _TB_NAME_CATEGORY + " (`name`, `featured`, `parent_cat`) VALUES ( ?, ?, ? )";
            var queryParams = [params.name, params.featured === true ? 1 : 0, params.parent_cat ? params.parent_cat : null];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error)
                    return rej(false);
                resIN(results.insertId);
            });
        }).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((result !== null || result !== undefined) && ((_a = params.image) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateCategoryMedia(+result, params.image)];
                    case 1:
                        if ((_b.sent()) === false)
                            return [2 /*return*/, rej(false)];
                        _b.label = 2;
                    case 2:
                        res(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
//discounts
var getAllDiscounts = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_DISCOUNT;
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            else
                res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingleDiscount = function (id) {
    return new Promise(function (res, rej) {
        var sql = "SELECT * FROM " + _TB_NAME_DISCOUNT +
            " WHERE `id` = ? ";
        var queryParams = [id];
        mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                rej(false);
            else
                res(JSON.parse(JSON.stringify(results[0] || null)));
        });
    });
};
var deleteDiscount = function (id) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, queryParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "UPDATE " + _TB_NAME_PRODUCTS + " SET `discount_id` = NULL WHERE `discount_id` = ?";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error)
                                    return rej(false);
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    sql = "DELETE FROM " + _TB_NAME_DISCOUNT + " WHERE `id` = ? ";
                    queryParams = [id];
                    mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                        if (error)
                            return rej(false);
                        res(true);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
var updateDiscount = function (params) {
    return new Promise(function (res, rej) {
        var sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ? WHERE `id` = ?";
        var queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.id];
        mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                return rej(false);
            res(true);
        });
    });
};
var insertDiscount = function (params) {
    return new Promise(function (res, rej) {
        var sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`) VALUES ( ?, ?, ?, ?, ? )";
        var queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code];
        mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(true);
        });
    });
};
var getAllActiveDiscounts = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id`, `name`, `percentage_value`,DATE_FORMAT(`start_at`, \"%d %m %Y\") AS `start_at`, DATE_FORMAT(`end_at`, \"%d %m %Y\") AS `end_at`, `promo_code` FROM " +
            _TB_NAME_DISCOUNT + " WHERE (`start_at` IS NULL AND `end_at` IS NULL) OR (NOW() BETWEEN `start_at` AND `end_at`) AND `promo_code` IS NOT NULL ";
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results)));
        });
    });
};
//products
var getAllProducts = function (custom) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var completeResponse, sql, queryParams, tmp, i_1, _i, tmp_1, row, assesssment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT `p`.`id`, `m`.`src_name` as `image`, `p`.`name`, `c`.`name` as `category`, `p`.`price`, " +
                        " CONCAT( IFNULL(`d`.`name`, \"Nema popusta\"), \"( \", IFNULL(`d`.`percentage_value`, \" \"), \" % )\" ) as `discount`, " +
                        " ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price`, `p`.`active` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                        " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` ON `c`.`id` = `p`.`product_category_id`" +
                        " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                        " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
                        " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` ";
                    queryParams = [1];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query((custom === null || custom === void 0 ? void 0 : custom.customSql) || sql, (custom === null || custom === void 0 ? void 0 : custom.customParams) || queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                completeResponse = JSON.parse(JSON.stringify(results));
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    if (!((completeResponse === null || completeResponse === void 0 ? void 0 : completeResponse.length) > 0)) return [3 /*break*/, 6];
                    tmp = completeResponse;
                    i_1 = 0;
                    _i = 0, tmp_1 = tmp;
                    _a.label = 2;
                case 2:
                    if (!(_i < tmp_1.length)) return [3 /*break*/, 6];
                    row = tmp_1[_i];
                    return [4 /*yield*/, getAssessmentForProduct(row['id'])];
                case 3:
                    assesssment = _a.sent();
                    completeResponse[i_1].assesssment = assesssment;
                    //set gallery
                    sql = "SELECT `m`.`src_name` FROM " + _TB_NAME_MEDIA + " `m` " +
                        " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                        " WHERE `pm`.`product_id` = ? ORDER BY `pm`.`main` DESC";
                    queryParams = [row['id']];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error)
                                    return rej(false);
                                completeResponse[i_1].gallery = results;
                                resIN(true);
                            });
                        })];
                case 4:
                    _a.sent();
                    i_1++;
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    res(completeResponse);
                    return [2 /*return*/];
            }
        });
    }); });
};
var getAllProductCategories = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id` as 'value', `name` as 'label' FROM " + _TB_NAME_CATEGORY;
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error)
                rej(false);
            else
                res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getAllProductDiscounts = function () {
    return new Promise(function (res, rej) {
        var sql = "SELECT `id` as 'value', `name` as 'label' FROM " + _TB_NAME_DISCOUNT;
        mysql_1.pool.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
                return rej(false);
            }
            res(JSON.parse(JSON.stringify(results || [])));
        });
    });
};
var getSingleProduct = function (id, custom) {
    return new Promise(function (res, rej) {
        var completeResponse;
        //take all info from `product` table
        new Promise(function (resIN, rejIN) {
            var sql = "SELECT * FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ?";
            var queryParams = [id];
            mysql_1.pool.query((custom === null || custom === void 0 ? void 0 : custom.customSql) || sql, (custom === null || custom === void 0 ? void 0 : custom.customParams) || queryParams, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    return rej(false);
                }
                completeResponse = JSON.parse(JSON.stringify(results[0] || null));
                resIN(true);
            });
        })
            .then(function (result) {
            //take main_image
            var sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?";
            var queryParams = [id, 1];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    return rej(false);
                }
                completeResponse.image = results;
            });
        })
            .then(function (result) {
            //take images (gallery)
            var sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                " WHERE `pm`.`product_id` = ? AND `pm`.`main` IS NULL";
            var queryParams = [id];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    return rej(false);
                }
                completeResponse.gallery = results;
                res(completeResponse);
            });
        });
    });
};
var deleteProduct = function (id) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, queryParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM " + _TB_NAME_PRODUCTS_MEDIA + " WHERE `product_id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    sql = "DELETE FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ? ";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(true);
                            });
                        })];
                case 2:
                    _a.sent();
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var deleteProductMedia = function (prod_id, media_id) {
    return new Promise(function (res, rej) {
        var sql = "DELETE FROM " + _TB_NAME_PRODUCTS_MEDIA + " WHERE `product_id` = ? AND `media_id` = ?";
        var queryParams = [prod_id, media_id];
        mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
            if (error)
                return rej(false);
            res(true);
        });
    });
};
var updateProductMedia = function (prod_id, image) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var i, _loop_2, _i, image_2, img;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (image === null || (image === null || image === void 0 ? void 0 : image.length) < 1)
                        return [2 /*return*/, res(true)];
                    i = 0;
                    _loop_2 = function (img) {
                        var sql, queryParams;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    sql = "INSERT INTO " + _TB_NAME_PRODUCTS_MEDIA + " (`product_id`, `media_id`";
                                    queryParams = [prod_id, img.id];
                                    if (i === 0) {
                                        sql += ", `main`) VALUES (?, ?, ?)";
                                        queryParams.push(1);
                                    }
                                    else
                                        sql += ") VALUES (?, ?)";
                                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                                if (error)
                                                    return rej(false);
                                                resIN(true);
                                            });
                                        })];
                                case 1:
                                    _b.sent();
                                    i++;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, image_2 = image;
                    _a.label = 1;
                case 1:
                    if (!(_i < image_2.length)) return [3 /*break*/, 4];
                    img = image_2[_i];
                    return [5 /*yield**/, _loop_2(img)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var getAllProductsCustom = function (type, ids) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var limit, allTypes, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limit = 15;
                    allTypes = [
                        {
                            customSql: "SELECT `p`.`id`, `m`.`src_name` as `image`, `p`.`name`, `p`.`price`, " +
                                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                                " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
                                " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` " +
                                " WHERE `p`.`active` = ? LIMIT ?",
                            customParams: [1, 1, limit]
                        },
                        {
                            customSql: "SELECT `p`.`id`, `m`.`src_name` as `image`, `m`.`alt_text`, `p`.`name`, `p`.`price`, " +
                                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                                " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
                                " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` " +
                                " WHERE `p`.`id` IN (?)",
                            customParams: [1, (ids === null || ids === void 0 ? void 0 : ids.length) < 1 ? null : ids]
                        }
                    ];
                    return [4 /*yield*/, getAllProducts(allTypes[type])];
                case 1:
                    products = _a.sent();
                    res(products);
                    return [2 /*return*/];
            }
        });
    }); });
};
var getSingleProductCustom = function (product_id, type) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var allTypes, products, assesssment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allTypes = [{
                            customSql: "SELECT `p`.`id`, `p`.`name`, `p`.`price`, `p`.`description`, `c`.`name` as `category`, " +
                                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                                " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                                " WHERE `p`.`id` = ?",
                            customParams: [product_id]
                        }];
                    return [4 /*yield*/, getSingleProduct(product_id, allTypes[type])];
                case 1:
                    products = _a.sent();
                    return [4 /*yield*/, getAssessmentForProduct(product_id)];
                case 2:
                    assesssment = _a.sent();
                    products.assesssment = assesssment;
                    res(products);
                    return [2 /*return*/];
            }
        });
    }); });
};
var updateProduct = function (params) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
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
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                                if (error)
                                    return rej(false);
                                resIN(true);
                            });
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateProductMedia(params.id, params.image)];
                case 2:
                    if ((_a.sent()) === false)
                        return [2 /*return*/, rej(false)];
                    res(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
var insertProduct = function (params) {
    return new Promise(function (res, rej) {
        new Promise(function (resIN, rejIN) {
            var sql = "INSERT INTO " + _TB_NAME_PRODUCTS + " (`name`, `featured`, `product_category_id`, `active`, `description`, `delivery_matter`, `barcode`, `unique_number`, `price`, `discount_id`) VALUES " +
                " ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
            var queryParams = [
                params.name,
                params.featured === true ? 1 : 0,
                params.product_category_id ? params.product_category_id : null,
                params.active === true ? 1 : 0,
                params.description,
                params.delivery_matter === true ? 1 : 0,
                params.barcode,
                params.unique_number,
                params.price,
                params.discount_id ? params.discount_id : null,
            ];
            mysql_1.pool.query(sql, queryParams, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    return rej(false);
                }
                resIN(results.insertId);
            });
        }).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((result !== null || result !== undefined) && ((_a = params.image) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateProductMedia(+result, params.image)];
                    case 1:
                        if ((_b.sent()) === false)
                            return [2 /*return*/, rej(false)];
                        _b.label = 2;
                    case 2:
                        res(true);
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
//assessment
var getAssessmentForProduct = function (id) {
    return new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
        var query, queryParams, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT COUNT(`id`) as `num`, SUM(IFNULL(`assessment`, 0)) as `sum` FROM " + _TB_NAME_ASESSMENT + " WHERE `product_id` = ?";
                    queryParams = [id];
                    return [4 /*yield*/, new Promise(function (resIN, rejIN) {
                            mysql_1.pool.query(query, queryParams, function (error, results, fields) {
                                if (error) {
                                    console.log(error);
                                    return rej(false);
                                }
                                resIN(JSON.parse(JSON.stringify(results))[0]);
                            });
                        })];
                case 1:
                    data = _a.sent();
                    if (data['num'] > 0)
                        return [2 /*return*/, res(data['sum'] / data['num'])];
                    res('Nema ocene');
                    return [2 /*return*/];
            }
        });
    }); });
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
                    }
                    return [3 /*break*/, 53];
                case 1: return [4 /*yield*/, getAllParentCategories()];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 3: return [4 /*yield*/, getAllCategories()];
                case 4:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 5: return [4 /*yield*/, insertCategory(params)];
                case 6:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 7: return [4 /*yield*/, updateCategory(params)];
                case 8:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 9: return [4 /*yield*/, deleteCategory(params.id)];
                case 10:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 11: return [4 /*yield*/, getSingleCategory(params.id)];
                case 12:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 13: return [4 /*yield*/, deleteCategoryMeida(params.cat_id, params.media_id)];
                case 14:
                    returnValue = _b.sent();
                    res.status(200);
                    _b.label = 15;
                case 15: return [4 /*yield*/, getAllParentCategoriesView()];
                case 16:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 17: return [4 /*yield*/, getAllCategoriesMenu()];
                case 18:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 19: return [4 /*yield*/, getCategoriesWithImg()];
                case 20:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 21: return [4 /*yield*/, getAllDiscounts()];
                case 22:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 23: return [4 /*yield*/, insertDiscount(params)];
                case 24:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 25: return [4 /*yield*/, updateDiscount(params)];
                case 26:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 27: return [4 /*yield*/, deleteDiscount(params.id)];
                case 28:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 29: return [4 /*yield*/, getSingleDiscount(params.id)];
                case 30:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 31: return [4 /*yield*/, getAllActiveDiscounts()];
                case 32:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 33: return [4 /*yield*/, getAllProducts()];
                case 34:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 35: return [4 /*yield*/, getAllProductDiscounts()];
                case 36:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 37: return [4 /*yield*/, getAllProductCategories()];
                case 38:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 39: return [4 /*yield*/, insertProduct(params)];
                case 40:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 41: return [4 /*yield*/, updateProduct(params)];
                case 42:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 43: return [4 /*yield*/, deleteProduct(params.id)];
                case 44:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 45: return [4 /*yield*/, getSingleProduct(params.id)];
                case 46:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 47: return [4 /*yield*/, deleteProductMedia(params.prod_id, params.media_id)];
                case 48:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 49: return [4 /*yield*/, getAllProductsCustom(params.type, params === null || params === void 0 ? void 0 : params.ids)];
                case 50:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 51: return [4 /*yield*/, getSingleProductCustom(params.id, params.type)];
                case 52:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 54];
                case 53:
                    res.status(404);
                    return [3 /*break*/, 54];
                case 54:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.products_endpoint = products_endpoint;
