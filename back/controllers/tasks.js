const Tasks = require('../models/tasks');

exports.all = function (req, res) {
    Tasks.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.create = function (req, res) {
    var task = {
        title: req.body.title,
        done: false,
    };
    Tasks.create(task, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(task)
    })
}

exports.update = function (req, res) {
    let changedProperty = {};
    if (req.body.title) {
        changedProperty = { title: req.body.title }
    }
    if (req.body.done !== undefined) {
        changedProperty = { done: req.body.done }
    }
    Tasks.update(req.params.id, changedProperty, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
} 

exports.delete = function (req, res) {
    Tasks.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
}