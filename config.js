/**
 * Created by shenshijun on 14-6-24.
 */
exports.base_url = "http://23.226.79.37:3000";
exports.douban = {
    app_id: "05a8eec5691e6dcf10facc503b5b496d",
    app_secret: "ec0faf30f04562a6",
    authorize_code_url: "https://www.douban.com/service/auth2/auth",
    authorize_token_url: "https://www.douban.com/service/auth2/token",
    user_info_url: "https://api.douban.com/v2/user/"

};
exports.back = {
    code_back_url: this.base_url + "/oauth/user"
};

