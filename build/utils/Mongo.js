"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Utils_1 = require("./Utils");
var Mongo = /** @class */ (function () {
    function Mongo() {
        // tslint:disable:no-console
        this.mongoose = mongoose;
        this.options = {
            autoIndex: false,
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000,
            family: 4,
            poolSize: 10,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            reconnectInterval: 500,
            reconnectTries: Number.MAX_VALUE,
            socketTimeoutMS: 45000,
        };
        this.launch();
    }
    Mongo.prototype.launch = function () {
        this.mongoose.connect("" + Utils_1.default.getMONGO_URI(), this.options);
        this.db = mongoose.connection;
        this.db.on('error', function (e) { return console.log(Utils_1.default.newDate() + ": connection error:" + e); });
        this.db.once('open', function () { return console.log(Utils_1.default.newDate() + ": Connected to Mongo"); });
    };
    return Mongo;
}());
exports.default = Mongo;
//# sourceMappingURL=Mongo.js.map