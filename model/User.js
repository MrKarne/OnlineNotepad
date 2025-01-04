const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// We automatically have an object id created so no need to do that here
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userdata: {
        type: Object,
        required: true,
        default: {
            "": ``
        }
    },
    refreshToken: String
});

module.exports = mongoose.model('noteappuser', userSchema);
// it will by default set this to lowercase and plural so it willl look for employees collection in the database