const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected."))
        .catch(err => console.log("Error Occured, ", err))
}

module.exports = connectToDB;