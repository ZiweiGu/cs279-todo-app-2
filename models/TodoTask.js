const mongoose = require('mongoose'); // add mongo db
const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
}) // Define a databse schema, consisting of 2 columns, content (String) and date (Dates)
module.exports = mongoose.model('TodoTask',todoTaskSchema); // export the schema so it can be used in index.js 