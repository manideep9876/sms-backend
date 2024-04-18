const mongoose = require('mongoose');

const students = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    dob: {

        type: String,
        required: true
    },
    section: {
        type: String,
        required: true

    },
    uploadphoto: {
        type: String
    },
    email: {
        type: String
    }
});
module.exports = mongoose.model('student', students)