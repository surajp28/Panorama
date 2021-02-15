const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    firstname: String,
    lastname: String,
    dob: Date,
    joindate: Date,
    consumption: Number,
    logmech: String
});

module.exports = mongoose.model('User', userSchema);