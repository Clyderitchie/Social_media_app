const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://clyderitchie:Tacomahc%405@socialmediaclone.9hbu1ko.mongodb.net/');

module.exports = mongoose.connection;