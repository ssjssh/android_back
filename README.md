豆瓣读书客户端的后台
=======================================


API
---------------------------------------
API主要分成两部分：
- 一部分是用户登录登出，
- 一部分是用户收藏图书的行为。
- 整个系统是的base url是[baseURL](htttp://....)

###注意
*所有的请求结果中都有一个success字段表示成功还是失败
*如果success为true，那么可能有附加数据，但是可能没有多余的消息
*如果success是false，那么一定会有一个msg字段表示错误原因
*每一个操作失败后都是一个错误消息，所以后面的API介绍中没有出错时的返回值

### 用户登录API

*用户注册:POST /signup  
    *参数
        *username：用户名，必填
        *password：用户密码，必填
        *confirm_password
    *返回值
        *如果成功，返回用户名，密码（编码后的，可以保存在客户端）
        *如果失败，返回一个错误消息
*用户登录，使用未加密的密码登录:POST /normal_login
    *参数
        *username:用户名，必填
        *password:用户密码必填
    *返回值
        *返回值同注册，客户端不应该存储password，而应该存储返回的密码
*用户使用加密的密码登录:POST /login
    *参数
        *username：用户名
        *password: 加密后的密码，这个密码是在signup或者normal_login中得到的。
    *返回值
        *同normal_login

### 用户收藏行为

*查看用户所有收藏:GET /user/:id/collection
    *参数
        id:用户ID，前面的登录和注册中都会返回用户ID
    *返回值
        *success字段，和一个列表
        *实例
        {
            "success": true,
            "collection": [
                {
                    "_id": "53ab91fb1795444192693e22",
                    "user_id": "53aac877f99362d46fce4c0d",
                    "book_id": "100",
                    "status": "reading-me",
                    "tags": "['c++',\"jsbaa\",\"sjsjsjs\"]",
                    "comment": "蛮好的,haohaodjdjd"
                },
                {
                    "_id": "53ab920c1795444192693e23",
                    "user_id": "53aac877f99362d46fce4c0d",
                    "book_id": "200",
                    "status": "reading-me",
                    "tags": "['c++',\"jsbaa\",\"sjsjsjs\"]",
                    "comment": "蛮好的,haohaodjdjd"
                },
                {
                    "_id": "53ab92111795444192693e24",
                    "user_id": "53aac877f99362d46fce4c0d",
                    "book_id": "300",
                    "status": "reading-me",
                    "tags": "['c++',\"jsbaa\",\"sjsjsjs\"]",
                    "comment": "蛮好的,haohaodjdjd"
                }
            ]
        }
*用户收藏某本图书:POST  /book/:id/collection
    *参数
        * user_id 必填，用户ID
        * status 必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
        * tags 收藏图书tag选填，使用列表表示
        * comment 选填，评价文本
    *返回值
        *实例
        {
            "success": true
        }
* 获取用户对某本图书的收藏信息：GET  /book/:id/collection
    *参数
        * user_id 用户ID
    *实例
    {
        "_id": "53ab91fb1795444192693e22",
        "user_id": "53aac877f99362d46fce4c0d",
        "book_id": "100",
        "status": "reading-me",
        "tags": "['c++',\"jsbaa\",\"sjsjsjs\"]",
        "comment": "蛮好的,haohaodjdjd",
        "success": true
    }
* 用户删除对某本图书的收藏：DELETE  /book/:id/collection
    *参数
        * user_id 用户ID
    *返回值
        {
         "success": true,
         "meg": "删除一本"
         }
* 用户修改对某本图书的收藏: PUT  /book/:id/collection
    *参数
        * user_id 必填，用户ID
        * status 必填（想读：wish 在读：reading 或 doing 读过：read 或 done）
        * tags 收藏图书tag选填，使用列表表示
        * comment 选填，评价文本
    *返回值：同POST

