"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var wording_1 = require("../config/wording");
var User_1 = require("../models/User");
var Utils_1 = require("../utils/Utils");
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
    }
    AuthenticationController.prototype.authenticate = function (req, res, secretKey) {
        var token = req.body.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    return res.status(403).json({ success: false, message: wording_1.default.tokenFailed });
                }
                else {
                    res.json({ success: true, message: null, token: decoded });
                }
            });
        }
        else if (req.body.username) {
            if (!Utils_1.default.verifyBody(req)) {
                res.status(500).json(Utils_1.default.formatData(false, wording_1.default.unauthorized));
                return;
            }
            User_1.default.findOne({ username: req.body.username }, function (err, user) {
                if (err) {
                    res.status(403).send({ succes: false, message: wording_1.default.badCredentials });
                }
                else if (!user) {
                    res.status(403).send({ success: false, message: wording_1.default.badCredentials });
                }
                else if (user) {
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        res.json({ success: false, message: wording_1.default.badCredentials });
                    }
                    else {
                        res.json({
                            message: wording_1.default.tokenEnjoy,
                            success: true,
                            token: jwt.sign({ username: user.username, id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, secretKey, { expiresIn: 86400 })
                        });
                    }
                }
            });
        }
        else {
            res.status(400).json({
                message: wording_1.default.badCredentials,
                succes: false,
            });
        }
    };
    return AuthenticationController;
}());
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map