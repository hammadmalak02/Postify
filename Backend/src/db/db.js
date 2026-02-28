const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect('mongodb://localhost:27017/socialapp');
    
    console.log('DB connected successfully!');
};

module.exports = connectDB;