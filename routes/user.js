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
var jwt_1 = require("./jwt/jwt");
var _TB_NAME = "user";
var getUserData = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, params;
    return __generator(this, function (_a) {
        sql = "SELECT ??, ??, ??, ??, ??, ??, ??  FROM ?? WHERE ?? = ?";
        params = ["id", "username", "firstname", "lastname", "rule_id", "phone", "email", _TB_NAME, "id", user_id];
        return [2 /*return*/, mysql_1.execute({ sql: sql, params: params, single: true })];
    });
}); };
var login = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, queryParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "SELECT ??, ??, ??, ??, ??, ??, ??  FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = SHA2(?, 256)";
                queryParams = ["id", "username", "firstname", "lastname", "rule_id", "phone", "email", _TB_NAME, "rule_id", 1, "username", params.username, "password", params.password];
                return [4 /*yield*/, mysql_1.execute({ sql: sql, params: queryParams, single: true })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var stillLogged = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var token, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.session.jwt;
                payload = token ? jwt_1.simpleVerifyJWT(token) : false;
                if (!payload) return [3 /*break*/, 2];
                return [4 /*yield*/, getUserData(payload.user_id)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [2 /*return*/, false];
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
                        case 'login': return [3 /*break*/, 3];
                        case 'logout': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 1: return [4 /*yield*/, stillLogged(req)];
                case 2:
                    returnValue = _b.sent();
                    res.status(200);
                    return [3 /*break*/, 7];
                case 3: return [4 /*yield*/, login(req.body)];
                case 4:
                    returnValue = _b.sent();
                    if (returnValue === null || returnValue === void 0 ? void 0 : returnValue.id)
                        jwt_1.giveAccess(req, { user_id: returnValue.id });
                    res.status(200);
                    return [3 /*break*/, 7];
                case 5:
                    jwt_1.killCookie(req);
                    returnValue = true;
                    res.status(200);
                    return [3 /*break*/, 7];
                case 6:
                    res.status(404);
                    return [3 /*break*/, 7];
                case 7:
                    res.send(returnValue);
                    return [2 /*return*/];
            }
        });
    });
}
exports.user_endpoint = user_endpoint;
