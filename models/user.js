const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userInfo = new Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    name: { type: String, required: true,},
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    country: { type: String, required: true },
    jobTitle: { type: String, },
    companyName: { type: String, },
    industry: { type: String, },
    profilePicture: { type: String, },
    role: { type: String, default: 'user' },
    verified: { type: Boolean },
})

module.exports = model('User', userInfo)