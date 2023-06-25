import { Schema, model } from "mongoose";
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'please provide username'],
        min: 4,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: [true, 'please provide password'],

    }
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bycrypt.compare(canditatePassword, this.password);
    return isMatch;
};

const User = model('User', UserSchema);

export default User;