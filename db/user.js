var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var URLSlugs = require('mongoose-url-slugs');

var UserSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: false},
  email: {type: String, required: true},
  birthday: {type: String, required: true},
  join_date: {type: Date, required: false},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  giftlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Gift'}],
  wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Gift'}],
  eventlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  options: {
    notify_me: {type: Boolean, default: true},
    notify_time: {type: Number, default: 3}
  }
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
