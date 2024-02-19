const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    roles: [{
        type: String,
        enum: ['Personal', 'PoolPro', 'Manager', 'Admin'],
        default: 'Personal'
    }],
    active: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('User', userSchema)