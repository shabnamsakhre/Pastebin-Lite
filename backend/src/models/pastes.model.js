const mongoose = require('mongoose');

// Define database Schema
const pasteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    ttl_seconds: {
        type: Number
    },
    max_views: {
        type: Number
    }
}, { timestamps: true });

// Create Model
const pasteModel = mongoose.model("pastes", pasteSchema)

module.exports = pasteModel;