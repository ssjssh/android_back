/**
 * Created by shenshijun on 14-6-26.
 */

exports.validate_basic = function (req, res, next) {
    var book_id = req.params.id;
    var user_id1 = req.query.user_id;
    var user_id2 = req.body.user_id;
    if (!book_id) {
        return res.json({"success": false, "msg": "id参数不能为空"});
    }
    if ((!user_id1) && (!user_id2)) {
        return res.json({"success": false, "msg": "user_id参数不能为空"});
    }
    next();
};

exports.validate_other = function (req, res, next) {
    var status = req.body.status;
    if (!status) {
        return res.json({"success": false, "msg": "status参数不能为空"});
    }
    next();
};

