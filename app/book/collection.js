/**
 * Created by shenshijun on 14-6-25.
 */
var db = require("../../db");
var mongodb = require("mongodb");

function get_user(user_id, callback) {
    var users = db.users;
    var o_id = mongodb.ObjectID.createFromHexString(user_id);
    return users.findOne({"_id": o_id}, function (err, user) {
        if (err) {
            throw err;
        }
        return callback(user);
    });

}
/**
 * 用户收藏某本图书
 * POST  /book/:id/collection
 * user_id 必填，用户ID
 * status 必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
 * tags 收藏图书tag选填，使用列表表示
 * comment 选填，评价文本
 * @param req
 * @param res
 * @param next
 */
exports.post = function (req, res, next) {
    var user_id = req.body.user_id;
    var book_col = db.book_col;
    return get_user(user_id, function (user) {
        if (user) {
            return book_col.findOne({"user_id": req.body.user_id, "book_id": req.params.id},
                function (err, doc) {
                    if (doc) {
                        doc.success = false;
                        return res.json(doc);
                    } else {
                        return book_col.insert({"user_id": user_id, "book_id": req.params.id, "status": req.body.status,
                            "tags": req.body.tags, "comment": req.body.comment}, function (err, doc) {
                            if (err) {
                                throw err;
                            }
                            return res.json({"success": true});
                        });
                    }
                });
        } else {
            return res.json({"success": false, "msg": "用户不存在"});
        }
    });


};

/**
 * 获取用户对某本图书的收藏信息
 * GET  https://api.douban.com/book/:id/collection
 * user_id 用户ID
 * @param req
 * @param res
 * @param next
 */
exports.get = function (req, res, next) {
    var book_col = db.book_col;

    return get_user(req.query.user_id, function (user) {
        if (user) {
            return book_col.findOne({"user_id": req.query.user_id, "book_id": req.params.id},
                function (err, doc) {
                    if (doc) {
                        doc.success = true;
                        return res.json(doc);
                    } else {
                        return res.json({"success": false, "msg": "用户没有收藏这本图书"})
                    }
                });
        } else {
            return res.json({"success": false, "msg": "用户不存在"});
        }
    });


};

/**
 * 用户删除对某本图书的收藏
 * DELETE  https://api.douban.com/book/:id/collection
 * user_id 用户ID
 * @param req
 * @param res
 * @param next
 */
exports.delete = function (req, res, next) {
    var book_col = db.book_col;
    return get_user(req.body.user_id, function (user) {
        if (user) {
            return book_col.remove({"user_id": req.body.user_id, "book_id": req.params.id},
                function (err, numberOfRemovedDocs) {
                    if (err) {
                        throw err;
                    }
                    if (numberOfRemovedDocs == 0) {
                        return res.json({"success": false, "msg": "文档不存在"});
                    } else if (numberOfRemovedDocs > 1) {
                        return res.json({"success": true, "msg": "图书被收藏多次"});
                    } else {
                        return res.json({"success": true, "meg": "删除一本"});
                    }
                })
        } else {
            return res.json({"success": false, "msg": "用户不存在"});
        }
    });

};

/**
 * 用户修改对某本图书的收藏
 * PUT  https://api.douban.com/book/:id/collection
 * user_id 必填，用户ID
 * status 必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
 * tags 收藏图书tag选填，使用列表表示
 * comment 选填，评价文本
 * @param req
 * @param res
 * @param next
 */
exports.put = function (req, res, next) {
    var book_col = db.book_col;
    return get_user(req.body.user_id, function (user) {
        if (user) {
            return book_col.update({"user_id": req.body.user_id, "book_id": req.params.id},
                {"$set": {"status": req.body.status, "tags": req.body.tags,
                    "comment": req.body.comment}},
                {upsert: true, w: 1},
                function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log(result);
                    if (result == 1) {
                        return res.json({"success": true});
                    } else if (result == 0) {
                        return res.json({"success": false, "msg": "没有收藏这本图书"});
                    } else {
                        return res.json({"success": false, "msg": "收藏了多次"});
                    }
                });
        } else {
            return res.json({"success": false, "msg": "用户不存在"});
        }
    });
};


exports.all = function (req, res, next) {
    var book_col = db.book_col;
    return get_user(req.params.id, function (user) {
        if (user) {
            return book_col.find({"user_id": req.params.id}).toArray(function (err, docs) {
                if (err) {
                    throw err;
                }
                if (docs.length > 0) {
                    return res.json({"success": true, "collection": docs});
                } else {
                    return res.json({"success": false, "msg": "这个用户还没有收藏"});
                }
            });
        } else {
            return res.json({"success": false, "msg": "用户不存在"});
        }
    });
};
