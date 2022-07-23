const mongoose = require("./db");

const MessageSchema = new mongoose.Schema({
    id:Number,
    text: String,
    is_read: Boolean,
    is_updated: Boolean,
    is_deleted: Boolean,
    createAt: Date,
    updatedAt:Date,
    deletedAt:Date,
    author: {
        id: Number,
        email: String,
        name: String,
        is_admin: Boolean,
        createdAt: Date
    },
    sendTo: {
        id: Number,
        email: String,
        name: String,
        is_admin: Boolean,
        createdAt: Date
    }
});

const Message = mongoose.model('messageries', MessageSchema);

module.exports = Message;
