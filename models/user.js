const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    itemIds: {
        type: [String],
        required: true,
        default: []
    }
});

userSchema.methods.hashPassword = async function () {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
    } catch (error) {
        next(error);
    }
};

userSchema.methods.isValidPassword = async function (entered) {
    try {
        return await bcrypt.compare(entered, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;