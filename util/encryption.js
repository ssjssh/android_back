/**
 * Created by shenshijun on 14-6-26.
 */
var crypto = require("crypto");

module.exports = function (raw_input) {
    var md5 = crypto.createHash("md5");
    md5.update(raw_input);
    return md5.digest("hex");
};
