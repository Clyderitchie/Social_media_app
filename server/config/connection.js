// const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork');

// module.exports = mongoose.connection;

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://clyderitchie:Tacomahc@5%405@socialmediaclone.9hbu1ko.mongodb.net/'; // Your MongoDB Atlas URI here

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;