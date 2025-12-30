const mongoose = require('mongoose');

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

const pasteModel = mongoose.model("pastes", pasteSchema)

module.exports = pasteModel;