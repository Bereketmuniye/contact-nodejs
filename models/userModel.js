const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            auto: true,
            ref: 'User',
        },
        username: {
            type: String,
            required: [true, "Please add a username"],
        },
        email: {
            type: String,
            unique: [true,"Please add an email"],
            required: [true, "Please add an email"],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    {
        timestamps: true,
    }
)    

module.exports = mongoose.model('User', userSchema);
