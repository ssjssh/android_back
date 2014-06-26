/**
 * Created by shenshijun on 14-6-25.
 */

exports.validate_input = function (req, res, next) {
    if (!req.body.username) {
        return res.json({"success": false, "msg": "用户名不能是空" });
    }
    if (!req.body.password) {
        return res.json({"success": false, "msg": "用户密码不能是空"});
    }
    next();
};
