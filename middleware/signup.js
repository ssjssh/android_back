/**
 * Created by shenshijun on 14-6-25.
 */

exports.validate_input = function (req, res, next) {
    if (!req.body.username) {
        return res.json({"success": false, "msg": "用户名不能是空"});
    }
    if (!req.body.password) {
        return res.json({"success": false, "meg": "用户密码没有输入"});
    }
    if (!req.body.confirm_password) {
        return res.json({"success": false, "msg": "没有输入用户确认密码"});
    }
    if (req.body.password !== req.body.confirm_password) {
        return res.json({"success": false, "msg": "密码和确认密码不同" })
    }
    next();
};
