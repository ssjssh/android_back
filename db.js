/**
 * Created by shenshijun on 14-6-25.
 */
var mongodb = require("mongodb");

var db_server = new mongodb.Server("127.0.0.1", 27017);
var db = new mongodb.Db("android_back", db_server);
if ((typeof this.users === "undefined") || (typeof this.book_col === "undefined")) {
    db.open(function (err, db) {
        if (err) {
            throw err;
        }
        db.collection("user", function (err, col) {
            if (err) {
                throw err;
            }
            col.ensureIndex({"username": 1},
                {"unique": true, "background": true, "dropDups": true},
                function (err, indexName) {
                    if (err) {
                        throw err;
                    }
                    col.ensureIndex({"create_time": 1},
                        {"background": true}, function (err, index_name) {
                            if (err) {
                                throw err;
                            }
                            exports.users = col;
                        });
                });
        });
        db.collection("book_col", function (err, col) {
            if (err) {
                throw err;
            }
            col.ensureIndex({"book_id": 1},
                {"background": true}, function (err, indexNamee) {
                    if (err) {
                        throw err;
                    }
                    exports.book_col = col;
                });
        });

    });
}



