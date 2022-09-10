const express = require("express"); // require express dependency
const app = express(); // create web app
const dotenv = require("dotenv"); // use .env to save the connection string in a separate file.
const mongoose = require("mongoose"); //connection to db
const TodoTask = require("./models/TodoTask"); //use model schema defined in TodoTask.js

dotenv.config(); // use the connection string in .env
app.use("/static", express.static("public")); //add our stylesheets
app.use(express.urlencoded({ extended: true })); //Urlencoded allows extracting the data from the form

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
console.log("Connected to db!"); // connect to mongo db

app.listen(3000, () => console.log("Server Up and running"));
}); //dedicate a port number and tell the express app to listen to that port.

app.set("view engine", "ejs"); //use .ejs files as templates

app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
  res.render("todo.ejs", { todoTasks: tasks });
  });
  });// use the todo.ejs template; read data from the database

app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    }); // when the add button is clicked, make the app inserts data into the database.

app.route("/edit/:id")
    .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
    })
    .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    }); // find id, render new template, and then update task

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    }); // use findByIdAndRemove to delete item if requested

