var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var hbs_mail = require('nodemailer-express-handlebars');
var schedule = require('node-schedule');

// Mongoose models
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Gift = mongoose.model('Gift');

// Nodemailer transporter, email config
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gift.it.no.reply@gmail.com',
    pass: 'giftit12'
  }
});

// Email templates
transporter.use('compile', hbs_mail({
  viewPath: 'emails/',
  extName: '.hbs'
}));

// Every day at 5pm
var rule = new schedule.RecurrenceRule();
rule.hour = 17;
rule.minute = 0;

var checkEventsJob = schedule.scheduleJob(rule, checkEvents);

function checkEvents () {
  // Today
  var today = new Date();

  // Get all users
  User.find({}).populate('eventlist').exec(function (err, users) {
    if (err) return;
    
    // Get only users who request notifications
    users.filter(function (user) {
      return user.options.notify_me;
    }).forEach(function (user) {

      // Get dates of user's events
      var dates = user.eventlist.map(function(evt) { 
        return new Date(evt.date); 
      });

      // Calculate the date difference from today
      dates.forEach(function (date) {
        var diff = Math.floor((today - date)/(1000 * 3600 * 24));
        if (diff == user.options.notify_time) {
          // Send an email to remind the user
          console.log("Send email");
        }
      });
    });
  });
}
