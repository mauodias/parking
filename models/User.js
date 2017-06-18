var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    realname: String,
    password: {type: String},
    subscribed: Boolean,
    role: {type: Number, default: 0}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
