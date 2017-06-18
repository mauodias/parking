var mongoose = require('mongoose');
var User = require('./User.js')

var SpotSchema = new mongoose.Schema({
    number: {type: Number, required: true, unique: true},
    floor: {type: Number, required: true},
    user: {type: User.schema, default: null},
    released: {type: Boolean, default: false}
});

module.exports = mongoose.model('Spot', SpotSchema);
