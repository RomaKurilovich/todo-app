const MongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = "tasks";

var state = {
    db: null
};

exports.connect = function (url, done) {
    debugger
    if (state.db) {
        return done()
    }

    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            return done(err);
        }
        state.db = db.db(DATABASE_NAME) ;
        done();
    })
}

exports.get = function () {
    return state.db;
}