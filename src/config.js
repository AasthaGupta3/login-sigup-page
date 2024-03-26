const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://127.0.0.1:27017/Login-tut");


connect.then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log("Database connection failed: " + err);
});

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("users", LogInSchema);

module.exports = collection;
