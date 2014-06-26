/**
 * Created by shenshijun on 14-6-25.
 */
var app = require("../server");
var request = require("supertest");
describe('login test', function () {
    it("it should return a err when the username is empty", function (done) {
        request(app)
            .post("/login")
            .send("password", "password")
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                res.body.success.should.equals(false);
            });
    });
});
