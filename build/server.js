"use strict";
// tslint:disable:no-console
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");
var helmet = require("helmet");
var logger = require("morgan");
var AuthenticateRouter_1 = require("./router/AuthenticateRouter");
var UserRouter_1 = require("./router/UserRouter");
var Mongo_1 = require("./utils/Mongo");
var Seeder_1 = require("./utils/Seeder");
var Utils_1 = require("./utils/Utils");
var Server = /** @class */ (function () {
    function Server() {
        this.url = Utils_1.default.getApiUrl();
        this.mongo = new Mongo_1.default();
        this.app = express();
        Utils_1.default.app = this.app;
        this.seeder = new Seeder_1.default();
        this.setConfig();
        this.routes();
    }
    Server.prototype.routes = function () {
        this.app.use(this.url + "users", UserRouter_1.default);
        this.app.use(this.url + "authenticate", AuthenticateRouter_1.default);
    };
    Server.prototype.setConfig = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        this.seeder.seedUser().then(function (e) { return console.log(Utils_1.default.log("Default user " + ((e) ? 'created' : 'already created'))); });
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map