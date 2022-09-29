const express = require('express');
const app = express();
const mongoose = require('./database/mongoose')
const Tasklist = require('./models/tasklist');
const Task = require('./models/task');

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');



    // Pass to next layer of middleware
    next();
});



app.use(express.json()); // or 3rd party body parser

/* 
CORS- cross origin request secuirty
Backend will run on : http://localhost:3000
Frontend will run : http://localhost:4200

CORS Will help our client talk to our backend, by default express will block requests from ports other than 
localhost:3000, but by using CORS will tell express that please allow request from our frontend which runs on port 4200 
*/

/* There are Two ways to impliment CORS 

1: 3rd party library name cors can be installed and used
like app.use(cors())

2:Add header 
*/



/* Now we have to create Routes /RESTFULL Webservices  */

/* what we will able to do with them api endpoints or routes

For tasklist = we will be able to Create, Read, ReadByID Update, Delete.
For task = we will be able to Create, Read, ReadByID Update, Delete.


*/



//Get all Task Lists
//http://localhost:3000/taklists => {tasklist1},{tasklist2},....

app.get('/tasklists', (req, res) => {
    Tasklist.find({})
        .then((list) => { res.send(list) })
        .catch((err) => { console.log(err) })
});



app.post('/tasklists', (req, res) => {
    let tasklistobj = { 'title': req.body.title };
    Tasklist(tasklistobj).save()
        .then((lists) => {
            res.status(201);
            res.send(lists);

        })
        .catch((err) => { console.log(err) })
})

// GET by ID: //http://localhost:3000/taklists/ID

app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    Tasklist.find({ _id: tasklistId })
        .then((lists) => {
            res.send(lists)

        })
        .catch((err) => {
            console.log(err)
        })
})


//Update
// PUT is full update of Object
app.put('/tasklists/:tasklistId', (req, res) => {
    Tasklist.findByIdAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((lists) => {
            res.status(201);
            res.send(lists);

        })
        .catch((err) => { console.log(err) })
})

// Patch is partial update of one field of an object

app.patch('/tasklists/:tasklistId', (req, res) => {
    Tasklist.findByIdAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((lists) => {
            res.status(201);
            res.send(lists);

        })
        .catch((err) => { console.log(err) })
})


//delete a task by id

app.delete('/tasklists/:tasklistId', (req, res) => {
    Tasklist.findByIdAndDelete(req.params.tasklistId)
        .then((lists) => {
            res.status(201);
            res.send(lists);

        })
        .catch((err) => { console.log(err) })
})

app.listen(3000, () => {
    console.log("Server Started on port 3000");
});



