const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userInfo = new Schema({
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
    name: { type: String,},
    gender: { type: String, },
    dob: { type: String, },
    country: { type: String, },
    jobTitle: { type: String, },
    companyName: { type: String, },
    industry: { type: String, },
    profilePicture: { type: String, },
    role: { type: String, default: 'user' },
    verified: { type: Boolean, default: false },
})

module.exports = model('User', userInfo)
