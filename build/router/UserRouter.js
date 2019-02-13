"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controller/userController");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.userController = new userController_1.default();
        this.router = express_1.Router();
        this.setRoutes();
    }
    UserRouter.prototype.setRoutes = function () {
        var _this = this;
        this.router
            .get('/', function (req, res) { return _this.userController.findAll(req, res); })
            .get('/:userID', function (req, res) { return _this.userController.findOne(req, res); })
            .post('/', function (req, res) { return _this.userController.create(req, res); })
            .put('/:userID', function (req, res) { return _this.userController.update(req, res); })
            .delete('/:userID', function (req, res) { return _this.userController.delete(req, res); });
    };
    return UserRouter;
}());
exports.default = new UserRouter().router;
//# sourceMappingURL=UserRouter.js.map