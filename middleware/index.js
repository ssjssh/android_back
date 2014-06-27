/**
 * Created by shenshijun on 14-6-25.
 */
var login_middleware = require("./login");
var signup_middleware = require("./signup");
var collection = require("./collection");
exports.login = {};
exports.login.validate = login_middleware.validate_input;
exports.signup = {};
exports.signup.validate = signup_middleware.validate_input;
exports.collection = collection;
exports.allow_all = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
};
