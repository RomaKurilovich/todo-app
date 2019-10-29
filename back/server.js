const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const tasksController = require('./controllers/tasks');
var cors = require('cors');

const CONNECTION_URL = "mongodb+srv://romakurilovich22:huawei201@cluster0-9x90z.mongodb.net/test?retryWrites=true&w=majority";

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', tasksController.all);

app.post('/tasks', tasksController.create);

app.put('/tasks/:id', tasksController.update);

app.delete('/tasks/:id', tasksController.delete);



db.connect(CONNECTION_URL, function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(process.env.PORT, function () {
        console.log('API app started');
    })
})