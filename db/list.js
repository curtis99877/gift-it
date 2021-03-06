var mongoose = require('mongoose');

var List = new mongoose.Schema({
  list_name: {type: String, required: true},
  list_owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  gifts: [{
    gift: {type: mongoose.Schema.Types.ObjectId, ref: 'Gift'},
    private_tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
  }]
});

mongoose.model('List', List);
