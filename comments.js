// Create web server application
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Route: /list_user
app.get('/list_user', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

// Route: /add_user
app.post('/add_user', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email
    };
    console.log(response);
    // Write output to response
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = response;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

// Route: /:id
app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // Parse data
        users = JSON.parse(data);
        // Get user by id
        var user = users["user" + req.params.id];
        console.log(user);
        // Write output to response
        res.end(JSON.stringify(user));
    });
});

// Route: /delete_user
app.delete('/delete_user', urlencodedParser, function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        // Parse data
        data = JSON.parse(data);
        // Delete user
        delete data["user" + req.body.id];
        console.log(data);
        // Write output to response
        res.end(JSON.stringify(data));
    });
});

// Path: /index.htm
app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
});

// Path: /process_get
app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    // Write output to response
    res.end(JSON.stringify(response));
}
);