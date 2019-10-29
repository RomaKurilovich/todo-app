const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.all = function (cb) {
    db.get().collection ('tasks').find().toArray(function (err, docs) {
        cb(err, docs);
    })
}

exports.create = function (task, cb) {
    db.get().collection('tasks').insert(task, function (err, result) {
        cb(err, result);
    })
}

exports.update = function (id, newData, cb){
    db.get().collection('tasks').updateOne(
        { _id: ObjectID(id) },
        {$set:newData},
        function (err, result) {
            cb(err, result);
        }
    )
}

exports.delete = function (id, cb) {
    db.get().collection('tasks').deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result);
        }
    )
}