"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("validator");
var config_1 = require("../config/config");
exports.default = {
    log: function (stringToShow) { return new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }) + ": " + stringToShow; },
    newDate: function () { return "" + new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }); },
    getTokenKey: function () { return process.env.secret || config_1.default.secret; },
    getMONGO_URI: function () { return process.env.MONGODB_URI || config_1.default.database; },
    getApiUrl: function () { return process.env.apiUrl || config_1.default.api_url; },
    getPort: function () { return process.env.PORT || config_1.default.port; },
    getDefaultUser: function () { return (process.env.defaultUser) ? JSON.parse(process.env.defaultUser) : config_1.default.defaultUser; },
    formatData: function (success, data) {
        if (data && data[0] && data[0].password) {
            return {
                data: data.map(function (user) {
                    var userToSend = user;
                    user.password = undefined;
                    return userToSend;
                }),
                success: success
            };
        }
        return { success: success, data: data };
    },
    verifyBody: function (req) {
        if (req.body.firstName && !validator.isAlphanumeric(req.body.firstName)
            || req.body.lastName && !validator.isAlphanumeric(req.body.lastName)
            || req.body.username && !validator.isAlphanumeric(req.body.username)
            || req.body.email && !validator.isEmail(req.body.email)
            || req.body.password && !validator.isAlphanumeric(req.body.password)) {
            return false;
        }
        return true;
    },
    app: null,
};
//# sourceMappingURL=Utils.js.map