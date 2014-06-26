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

app.post("/signup", middleware.signup.validate, user.post.signup);
app.post("/login", middleware.login.validate, user.post.login);
app.post("/normal_login", middleware.login.validate, user.post.login_normal);
app.get("/user/:id/collection", book.collect.all);
app.get("/book/:id/collection", middleware.collection.validate_basic, book.collect.get);
app.post("/book/:id/collection", middleware.collection.validate_basic, middleware.collection.validate_other, book.collect.post);
app.put("/book/:id/collection", middleware.collection.validate_basic, middleware.collection.validate_other, book.collect.put);
app.delete("/book/:id/collection", middleware.collection.validate_basic, book.collect.delete);
app.listen(3000);
module.exports = app;