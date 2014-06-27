/**
 * Created by shenshijun on 14-6-19.
 */
var express = require("express");
var user = require("./app/user");
var middleware = require("./middleware");
var book = require("./app/book");

var app = express();


app.set("view engine", "ejs");
app.set("views", __dirname + '/views');
/**
 * config middleware
 */
app.use(express.bodyParser());
/**
 * router
 */

app.post("/signup", middleware.allow_all, middleware.signup.validate, user.post.signup);
app.post("/login", middleware.allow_all, middleware.login.validate, user.post.login);
app.post("/normal_login", middleware.allow_all, middleware.login.validate, user.post.login_normal);
app.get("/user/:id/collection", middleware.allow_all, book.collect.all);
app.get("/book/:id/collection", middleware.allow_all, middleware.collection.validate_basic, book.collect.get);
app.post("/book/:id/collection", middleware.allow_all, middleware.collection.validate_basic, middleware.collection.validate_other, book.collect.post);
app.put("/book/:id/collection", middleware.allow_all, middleware.collection.validate_basic, middleware.collection.validate_other, book.collect.put);
app.delete("/book/:id/collection", middleware.allow_all, middleware.collection.validate_basic, book.collect.delete);
app.listen(4000);
module.exports = app;