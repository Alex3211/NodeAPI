"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var wording_1 = require("../config/wording");
var Utils_1 = require("./Utils");
function authenticateBefore(target, key, descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        var status = { status: false, user: false };
        for (var _i = 0, _a = Array.from(arguments); _i < _a.length; _i++) {
            var arg = _a[_i];
            args.push(arg);
        }
        var req = args[0];
        var res = args[1];
        var token = req.body.token || req.headers['x-access-token'] || '';
        jwt.verify(token, Utils_1.default.getTokenKey(), function (err, decoded) {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: wording_1.default.tokenFailed
                });
            }
            else {
                status.status = true;
                status.user = decoded;
                args.push(status);
                if (decoded.role >= config_1.default.permissions[key]) {
                    originalMethod.apply(_this, args);
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: wording_1.default.unauthorized
                    });
                }
            }
            return status;
        });
    };
    return descriptor;
}
exports.default = authenticateBefore;
//# sourceMappingURL=Middleware.js.map