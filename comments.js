// Create web server application
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var port = 3000;

// Database connection
mongoose.connect("mongodb://localhost/message_board");
var Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 4},
    message: {type: String, required: true, minlength: 4},
    _comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true});
var CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: "Message"},
    name: {type: String, required: true, minlength: 4},
    comment: {type: String, required: true, minlength: 4}
}, {timestamps: true});
mongoose.model("Message", MessageSchema);
mongoose.model("Comment", CommentSchema);
var Message = mongoose.model("Message");
var Comment = mongoose.model("Comment");

// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Use static files
app.use(express.static(path.join(__dirname, "./static")));

// Use EJS
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Routes
// Root request to render index.ejs
app.get("/", function(req, res) {
    Message.find({}).populate("_comments").exec(function(err, messages) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Messages: ", messages);
            res.render("index", {messages: messages});
        }
    });
});
// Post request for new message
app.post("/message", function(req, res) {
    console.log("POST DATA: ", req.body);
    var message = new Message({name: req.body.name, message: req.body.message});
    message.save(function(err) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Message saved.");
            res.redirect("/");
        }
    });
});
// Post request for new comment
app.post("/comment/:id", function(req, res) {
    Message.findOne({_id: req.params.id}, function(err, message) {
        if (err) {
            console.log("Error: ",