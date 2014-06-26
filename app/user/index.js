/**
 * Created by shenshijun on 14-6-25.
 */
var db = require("../../db");
var util = require("../../util");
exports.post = {};
exports.post.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var users = db.users;
    return users.findOne({"username": username, "password": password}, function (err, doc) {
        if (err) {
            next(err);
        }
        if (doc) {
            doc.success = true;
            return res.json(doc);
        } else {
            return res.json({"success": false, "msg": "没有找到用户"});
        }
    });
};

exports.post.signup = function (req, res, next) {
    var username = req.body.username;
    var raw_password = req.body.password;
    var password = util.encrypt(raw_password);
    var users = db.users;
    return users.findOne({"username": username}, function (err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            return res.json({"success": false, "msg": "这个用户名已经被注册"});
        } else {
            return users.insert(
                {"username": username,
                    "password": password,
                    "create_time": new Date() },
                function (err, doc) {
                    if (err) {
                        throw err;
                    }
                    return users.findOne({"username": username, "password": password}, function (err, doc) {
                        if (err) {
                            throw err;
                        }
                        doc.success = true;
                        return res.json(doc);
                    });
                });
        }
    });
};

exports.post.login_normal = function (res, req, next) {
    var username = res.body.username;
    var raw_password = res.body.password;
    var password = util.encrypt(raw_password);
    var users = db.users;
    return users.findOne({"username": username, "password": password}, function (err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            doc.success = true;
            return req.json(doc);
        } else {
            return req.json({"success": false, "msg": "用户名或者密码错误"});
        }
    });
};
